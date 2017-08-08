from flask import Flask, render_template, session, redirect, url_for, request, jsonify
from os import environ
from flask_heroku import Heroku
from flask_migrate import Migrate
from forms import NewLinkForm, NewPosterForm
from providers import extract_data
from database import db
from models import *


app = Flask(__name__)
# config
heroku = Heroku(app)
app.secret_key = environ.get('SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# database
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/', methods=['GET', 'POST'])
def index():
    form = NewLinkForm()
    if form.validate_on_submit():
        session['source_url'] = form.source_url.data
        return redirect(url_for('new_poster'))
    session.pop('source_url', None)
    return render_template('index.html', form=form)

@app.route('/new', methods=['GET', 'POST'])
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

    form = NewPosterForm(**context)
    if form.validate_on_submit():
        p = Poster(
            form.title.data, form.authors.data, form.abstract.data,
            source_url, form.download_url.data, form.presented_at.data
        )
        db.session.add(p)
        db.session.commit()
        return redirect(url_for('get_poster', uuid=p.id))

    return render_template('new_poster.html', source_url=source_url, form=form)

@app.route('/posters/<uuid>', methods=['GET'])
def get_poster(uuid):
    poster = Poster.query.get_or_404(uuid)
    if request.headers.get('accept') == 'application/json':
        return jsonify(poster.serialize())
    return render_template('get_poster.html', poster=poster)
