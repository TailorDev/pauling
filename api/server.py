from flask import Flask, render_template, session, redirect, url_for, request, jsonify
from os import environ
from forms import NewForm, EntryForm
from providers import extract_data


app = Flask(__name__)
app.secret_key = environ.get('FLASK_SECRET_KEY')

@app.route('/', methods=['GET', 'POST'])
def index():
    form = NewForm()
    if form.validate_on_submit():
        session['source_url'] = form.source_url.data
        return redirect(url_for('new'))
    return render_template('index.html', form=form)

@app.route('/new', methods=['GET', 'POST'])
def new():
    source_url = session.get('source_url')
    context = {
        'title': '',
        'authors': '',
        'abstract': '',
        'download_url': '',
        'presented_at': '',
        'source_url': source_url,
    }

    if request.method == 'GET':
        if not source_url:
            return redirect(url_for('index'))

        context.update(extract_data(source_url))
        form = EntryForm(**context)
    else:
        form = EntryForm()
        if form.validate_on_submit():
            # TODO: redirect to QR code page
            return "QR CODE"

    return render_template('new.html', form=form)
