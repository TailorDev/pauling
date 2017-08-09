import datetime
import uuid

from flask import url_for
from sqlalchemy import Column, DateTime, String, Text, text
from sqlalchemy.dialects.postgresql import UUID

from database import db


class Poster(db.Model):
    __tablename__ = 'posters'

    id = Column(UUID(as_uuid=True), primary_key=True)
    title = Column(String(400))
    authors = Column(Text)
    abstract = Column(Text)
    source_url = Column(String(400), nullable=False)
    download_url = Column(String(400), nullable=False)
    presented_at = Column(String(200))
    created_at = Column('create_date', DateTime, default=datetime.datetime.now())
    id_admin = Column(UUID(as_uuid=True), unique=True, nullable=False)
    email = Column(String(50))

    def __init__(self, title, authors, abstract, source_url, download_url, presented_at):
        self.id = uuid.uuid4()
        self.title = title
        self.authors = authors
        self.abstract = abstract
        self.source_url = source_url
        self.download_url = download_url
        self.presented_at = presented_at
        self.id_admin = uuid.uuid4()

    def __repr__(self):
        return '<User {}>'.format(str(self.id))

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'authors': self.authors,
            'abstract': self.abstract,
            'source_url': self.source_url,
            'download_url': self.download_url,
            'presented_at': self.presented_at,
            'created_at': self.created_at.isoformat(),
        }

    def public_url(self, absolute=False):
        return url_for('get_poster', id=self.id, _external=absolute)

    def admin_url(self, absolute=False):
        return url_for('edit_poster', id_admin=self.id_admin, _external=absolute)

    def qrcode_svg_url(self, absolute=False):
        return url_for('poster_qrcode_svg', id=self.id, _external=absolute)

    def qrcode_png_url(self, absolute=False):
        return url_for('poster_qrcode_png', id=self.id, _external=absolute)
