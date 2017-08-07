from flask import Flask, render_template, session, redirect, url_for, request
from os import environ
from forms import NewForm


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
    if request.method == 'GET' and not 'source_url' in session:
        return redirect(url_for('index'))
    return render_template('new.html', source_url=session['source_url'])
