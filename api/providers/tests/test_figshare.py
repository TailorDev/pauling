import json
import pathlib

import pytest

from ..figshare import extract_data

FIXTURES_DIR = '{}/fixtures'.format(pathlib.Path(__file__).parent)


@pytest.fixture
def json_content():
    with open('{}/figshare_1.json'.format(FIXTURES_DIR)) as f:
        content = f.read()
    return json.loads(content)


def test_extract_data(json_content):
    data = extract_data(json_content)
    assert data.get('title') == 'Imperfect centered sites - a new mode of miRNA binding'
    assert data.get('presented_at') == ''


def test_extract_data_empty():
    data = extract_data({})
    assert data.get('title') == ''
    assert data.get('authors') == ''
    assert data.get('abstract') == ''
    assert data.get('download_url') == ''
    assert data.get('presented_at') == ''
