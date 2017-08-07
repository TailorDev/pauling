from flask import Flask, render_template, session, redirect, url_for, request
from os import environ
from forms import NewForm, EntryForm
from jinja2.filters import do_striptags
from bs4 import BeautifulSoup

import requests
import json
import re


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

        m = re.match('https://figshare.com/.+/(\d+)', source_url)
        if m:
            r = requests.get('https://api.figshare.com/v2/articles/{}'.format(m.group(1)))
            data = r.json()
            context.update({
                'title': data.get('title'),
                'authors': ', '.join([a.get('full_name') for a in data.get('authors')]),
                'abstract': do_striptags(data.get('description')),
                'download_url': data.get('files')[0].get('download_url') if len(data.get('files')) else '',
            })

        m = re.match('https://f1000research.com/posters/.+', source_url)
        if m:
            r = requests.get(source_url)
            s = BeautifulSoup(r.text, 'lxml')
            context.update({
                'title': s.find(class_='asset-title').text.strip(),
                'authors': re.sub('\s+', ' ', s.find(class_='asset-authors').text).strip(),
                'abstract': do_striptags(s.find(id='summary-text-field').get('value')),
                'download_url': s.find('a', class_='download').get('data-url'),
                'presented_at': re.sub('\s+', ' ', s.find(class_='asset-subcontainer__content--conf').text).strip(),
            })

        form = EntryForm(**context)
    else:
        form = EntryForm()
        if form.validate_on_submit():
            # TODO: redirect to QR code page
            return "QR CODE"

    return render_template('new.html', form=form)
