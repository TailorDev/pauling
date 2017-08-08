from ..f1000 import extract_data

import pytest
import pathlib


FIXTURES_DIR = '{}/fixtures'.format(pathlib.Path(__file__).parent)

@pytest.fixture
def html_content():
    with open('{}/f1000_1.html'.format(FIXTURES_DIR)) as f:
        html = f.read()
    return html

def test_extract_data(html_content):
    data = extract_data(html_content)
    assert data.get('title') == 'A Ruby API for the Ensembl database'
    assert data.get('presented_at') == 'ISMB/ECCB 2011'

def test_extract_data_empty():
    data = extract_data('')
    assert data.get('title') == ''
    assert data.get('authors') == ''
    assert data.get('abstract') == ''
    assert data.get('download_url') == ''
    assert data.get('presented_at') == ''
