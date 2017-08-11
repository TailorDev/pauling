from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField, TextAreaField
from wtforms.fields.html5 import URLField, EmailField
from wtforms.validators import InputRequired, URL, Regexp


class NewLinkForm(FlaskForm):
    source_url = URLField('source_url', validators=[InputRequired(), URL()])


class UploadForm(FlaskForm):
    file = FileField(validators=[
        FileRequired(),
        FileAllowed(['jpg', 'png', 'pdf'], 'Only JPG, PNG and PDF files are supported')
    ])


class PosterForm(FlaskForm):
    title = StringField('title', validators=[InputRequired()])
    authors = StringField('authors', validators=[])
    abstract = TextAreaField('abstract', validators=[])
    download_url = URLField('download_url', validators=[InputRequired(), URL()])
    presented_at = StringField('presented_at', validators=[])


class EmailForm(FlaskForm):
    email = EmailField('email', validators=[
        InputRequired(),
        Regexp('.+@.+', message='We are not too strict with emails, but at least put the "@" sign...'),
    ])
