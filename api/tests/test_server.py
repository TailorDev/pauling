import unittest
from os import environ

from models import Poster
from server import app, db


@unittest.skipUnless(environ.get('DATABASE_URL'), 'DATABASE_URL env variable must be set')
class TestCase(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_index(self):
        r = self.client.get('/')
        assert r.status_code == 200
        assert b'Paste the link to your poster on F1000, Figshare, etc.' in r.data

    def test_get_poster(self):
        p = Poster(title='Hello', source_url='http://example.org', download_url='')
        with app.app_context():
            db.session.add(p)
            db.session.commit()
            r = self.client.get('/posters/{}'.format(p.id))
        assert r.status_code == 200
        assert b'<h1 class="title">Hello</h1>' in r.data

    def test_get_poster_json(self):
        p = Poster(title='Hello', source_url='http://example.org', download_url='')
        with app.app_context():
            db.session.add(p)
            db.session.commit()
            r = self.client.get('/posters/{}'.format(p.id), headers={
                'Accept': 'application/json',
            })
        assert r.status_code == 200
        assert r.content_type == 'application/json'

    def test_get_qrcode_png(self):
        p = Poster(title='Hello', source_url='http://example.org', download_url='')
        with app.app_context():
            db.session.add(p)
            db.session.commit()
            r = self.client.get('/posters/{}.png'.format(p.id))
        assert r.status_code == 200

    def test_get_qrcode_svg(self):
        p = Poster(title='Hello', source_url='http://example.org', download_url='')
        with app.app_context():
            db.session.add(p)
            db.session.commit()
            r = self.client.get('/posters/{}.svg'.format(p.id))
        assert r.status_code == 200

    def test_get_poster_with_invalid_id(self):
        r = self.client.get('/posters/{}'.format('invalid-uuid'))
        assert r.status_code == 404
        assert b'Go to Home' in r.data
