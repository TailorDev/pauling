from flask_wtf import FlaskForm
from wtforms.fields.html5 import URLField
from wtforms.validators import InputRequired, URL


class NewForm(FlaskForm):
    source_url = URLField('source_url', validators=[InputRequired(), URL()])
