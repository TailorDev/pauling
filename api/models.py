from sqlalchemy import Column, Text, String, DateTime, text
from sqlalchemy.dialects.postgresql import UUID
from database import db

import datetime
import uuid


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

    def __init__(self, title, authors, abstract, source_url, download_url, presented_at):
        self.id = uuid.uuid4()
        self.title = title
        self.authors = authors
        self.abstract = abstract
        self.source_url = source_url
        self.download_url = download_url
        self.presented_at = presented_at

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
