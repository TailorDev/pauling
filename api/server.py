from flask import Flask, render_template, session, redirect, url_for, request, jsonify
from os import environ
from forms import NewLinkForm, NewPosterForm
from providers import extract_data


app = Flask(__name__)
app.secret_key = environ.get('FLASK_SECRET_KEY')

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
        # TODO: persist poster in db
        # redirect to /posters/<uuid>
        return "QR CODE"

    return render_template('new_poster.html', source_url=source_url, form=form)

@app.route('/posters/<uuid>', methods=['GET'])
def get_poster(uuid):
    poster = { 'uuid': uuid }
    if request.headers.get('accept') == 'application/json':
        return jsonify(poster)
    return render_template('get_poster.html', poster=poster)
