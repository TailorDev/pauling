from flask import Flask
from flask import render_template


app = Flask(__name__)

@app.route('/')
@app.route('/hello/<name>')
def hello_world(name=None):
    return render_template('hello.html', name=name)
