from os import environ

import cloudinary
from cloudinary.uploader import upload as cloudinary_upload
from flask import (Flask, flash, jsonify, redirect, render_template, request,
                   send_file, session, url_for)
from flask_heroku import Heroku
from flask_migrate import Migrate
from flask_uuid import FlaskUUID
from flask_sslify import SSLify

from database import db
from emails import mail, send_admin_info
from forms import EmailForm, NewLinkForm, PosterForm, UploadForm
from models import Poster
from providers import extract_data
from qr import make_png, make_svg

app = Flask(__name__)
# config
heroku = Heroku(app)
app.secret_key = environ.get('SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_PORT'] = environ.get('MAILGUN_SMTP_PORT', 25)
app.config['MAIL_FROM'] = environ.get('MAIL_FROM', 'hello@tailordev.fr')
app.config['CLOUDINARY_URL'] = environ.get('CLOUDINARY_URL')
app.config['CLOUDINARY_BASE_URL'] = environ.get('CLOUDINARY_BASE_URL')
try:
    app.config.from_object('local_settings')
    # this is required to use pycloudinary
    environ['CLOUDINARY_URL'] = app.config['CLOUDINARY_URL']
    cloudinary.reset_config()
except ImportError:
    pass
# database
db.init_app(app)
migrate = Migrate(app, db)
# emails
mail.init_app(app)
# converters
FlaskUUID(app)
# SSL redirection
if environ.get('FORCE_SSL') is True:
    SSLify(app, permanent=True)


@app.route('/', methods=['GET', 'POST'])
def index():
    form = NewLinkForm()
    if form.validate_on_submit():
        session['source_url'] = form.source_url.data
        return redirect(url_for('new_poster'))
    session.pop('source_url', None)
    return render_template('index.html', form=form, upload_form=UploadForm())


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    form = UploadForm()
    if form.validate_on_submit():
        upload_result = cloudinary_upload(form.file.data)
        session['source_url'] = upload_result['secure_url']
        flash('Your poster has been successfully uploaded!')
        return redirect(url_for('new_poster'))
    return render_template('index.html', form=NewLinkForm(), upload_form=form)


@app.route('/posters/new', methods=['GET', 'POST'])
def new_poster():
    source_url = session.get('source_url')
    context = {
        'title': 'Untitled',
        'authors': '',
        'abstract': '',
        'download_url': '',
        'presented_at': '',
    }

    if request.method == 'GET':
        if not source_url:
            return redirect(url_for('index'))
        context.update(extract_data(source_url))

    form = PosterForm(**context)
    if form.validate_on_submit():
        p = Poster(
            title=form.title.data,
            authors=form.authors.data,
            abstract=form.abstract.data,
            source_url=source_url,
            download_url=form.download_url.data,
            presented_at=form.presented_at.data,
        )
        db.session.add(p)
        db.session.commit()
        flash('Information successfully saved!')
        return redirect(url_for('publish_poster', id_admin=p.id_admin))

    return render_template('new_edit_poster.html', is_edit=False, form=form)


@app.route('/posters/<uuid:id>', methods=['GET'])
def get_poster(id):
    poster = Poster.query.get_or_404(id)
    if request.headers.get('accept') == 'application/json':
        return jsonify({'poster': poster.serialize()})
    return render_template('get_poster.html', poster=poster)


@app.route('/posters/<uuid:id>.png', methods=['GET'])
def get_qrcode_png(id):
    p = Poster.query.get_or_404(id)
    return send_file(make_png(p), mimetype='image/png')


@app.route('/posters/<uuid:id>.svg', methods=['GET'])
def get_qrcode_svg(id):
    p = Poster.query.get_or_404(id)
    return send_file(make_svg(p), mimetype='image/svg+xml')


@app.route('/admin/posters/<uuid:id_admin>/publish', methods=['GET', 'POST'])
def publish_poster(id_admin):
    p = Poster.query.filter_by(id_admin=id_admin).first_or_404()
    form = EmailForm()
    if form.validate_on_submit():
        p.email = form.email.data
        db.session.add(p)
        db.session.commit()
        send_admin_info(p, sender=app.config['MAIL_FROM'])
        flash('Information successfully updated! You should receive an email soon.')
        return redirect(url_for('publish_poster', id_admin=p.id_admin))
    return render_template('publish_poster.html', form=form, poster=p)


@app.route('/admin/posters/<uuid:id_admin>/edit', methods=['GET', 'POST'])
def edit_poster(id_admin):
    p = Poster.query.filter_by(id_admin=id_admin).first_or_404()
    form = PosterForm(obj=p)
    if form.validate_on_submit():
        # TODO: make sure it is mass-assignment proof
        form.populate_obj(p)
        db.session.add(p)
        db.session.commit()
        flash('Information successfully updated!')
        return redirect(p.admin_url())
    return render_template('new_edit_poster.html', is_edit=True, form=form)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html', title='Page Not Found', status=404), 404


@app.errorhandler(500)
def internal_server_error(e):
    db.session.rollback()
    return render_template('error.html', title='Ooops. An error has occured', status=500), 500
