from io import BytesIO
from os import environ

import qrcode
import qrcode.image.svg
from PIL import Image, ImageDraw, ImageFont, ImageColor
from flask import (Flask, flash, jsonify, redirect, render_template, request,
                   send_file, session, url_for)
from flask_heroku import Heroku
from flask_mail import Mail, Message
from flask_migrate import Migrate

from database import db
from emails import EMAIL_PUBLISH_PLAIN_TEXT, EMAIL_PUBLISH_TITLE
from forms import EmailForm, NewLinkForm, PosterForm
from models import Poster
from providers import extract_data

app = Flask(__name__)
# config
heroku = Heroku(app)
app.secret_key = environ.get('SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_USE_TLS'] = not app.debug
app.config['MAIL_PORT'] = environ.get('MAILGUN_SMTP_PORT', 25)
# database
db.init_app(app)
migrate = Migrate(app, db)
# emails
mail = Mail(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    form = NewLinkForm()
    if form.validate_on_submit():
        session['source_url'] = form.source_url.data
        return redirect(url_for('new_poster'))
    session.pop('source_url', None)
    return render_template('index.html', form=form)

@app.route('/posters/new', methods=['GET', 'POST'])
def new_poster():
    source_url = session.get('source_url')
    context = {
        'title': '',
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
            form.title.data, form.authors.data, form.abstract.data,
            source_url, form.download_url.data, form.presented_at.data
        )
        db.session.add(p)
        db.session.commit()
        flash('Information successfully saved!')
        return redirect(url_for('publish_poster', id_admin=p.id_admin))

    return render_template('new_edit_poster.html', is_edit=False, form=form)

@app.route('/posters/<id>', methods=['GET'])
def get_poster(id):
    poster = Poster.query.get_or_404(id)
    if request.headers.get('accept') == 'application/json':
        return jsonify(poster.serialize())
    return render_template('get_poster.html', poster=poster)

@app.route('/posters/<id>.png', methods=['GET'])
def poster_qrcode_png(id):
    p = Poster.query.get_or_404(id)
    buf = BytesIO()
    qr = qrcode.QRCode(border=6)
    qr.add_data(p.public_url(absolute=True))
    img = qr.make_image()
    img_draw = ImageDraw.Draw(img)
    font = ImageFont.truetype('Lato-Medium.ttf', 24)
    img_draw.text((70, 3), 'Want this poster on your phone?', font=font)
    img_draw.text((53, 450), 'Use the Pauling app on Android/iOS', font=font)
    img.save(buf)
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

@app.route('/posters/<id>.svg', methods=['GET'])
def poster_qrcode_svg(id):
    p = Poster.query.get_or_404(id)
    buf = BytesIO()
    qr = qrcode.QRCode(border=6)
    qr.add_data(p.public_url(absolute=True))
    img = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
    img.save(buf)
    buf.seek(0)
    return send_file(buf, mimetype='image/svg+xml')

@app.route('/admin/posters/<id_admin>/publish', methods=['GET', 'POST'])
def publish_poster(id_admin):
    p = Poster.query.filter_by(id_admin=id_admin).first_or_404()
    form = EmailForm()
    if form.validate_on_submit():
        p.email = form.email.data
        db.session.add(p)
        db.session.commit()
        flash('Information successfully updated! You should receive an email soon.')
        vars = {
            'poster': p,
            'public_url': p.public_url(absolute=True),
            'admin_url': p.admin_url(absolute=True),
        }
        msg = Message(
            EMAIL_PUBLISH_TITLE,
            sender='hello@tailordev.fr',
            recipients=[p.email],
            body=EMAIL_PUBLISH_PLAIN_TEXT.format(**vars)
        )
        mail.send(msg)
        return redirect(url_for('publish_poster', id_admin=p.id_admin))
    return render_template('publish_poster.html', form=form, poster=p)

@app.route('/admin/posters/<id_admin>/edit', methods=['GET', 'POST'])
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
