from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.fields.html5 import URLField
from wtforms.validators import InputRequired, URL


class NewLinkForm(FlaskForm):
    source_url = URLField('source_url', validators=[InputRequired(), URL()])

class NewPosterForm(FlaskForm):
    title = StringField('title', validators=[])
    authors = StringField('authors', validators=[])
    abstract = TextAreaField('abstract', validators=[])
    download_url = URLField('download_url', validators=[InputRequired(), URL()])
    presented_at = StringField('presented_at', validators=[])
