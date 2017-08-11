from models import Poster


def test_is_image():
    p = Poster(title='title', source_url='', download_url='http://example.org/poster.png')
    assert p.is_image() is True
