from .figshare import FIGSHARE_URL_PATTERN, FIGSHARE_API_URL, extract_data as figshare_extract_data
from .f1000 import F1000_URL_PATTERN, extract_data as f1000_extract_data

import re
import requests
import json


def extract_data(source_url):
    """ extract data based on supported data providers """
    m = re.match(FIGSHARE_URL_PATTERN, source_url)
    if m:
        r = requests.get('{}/{}'.format(FIGSHARE_API_URL, m.group(1)))
        return figshare_extract_data(r.json())

    m = re.match(F1000_URL_PATTERN, source_url)
    if m:
        r = requests.get(source_url)
        return f1000_extract_data(r.text)

    return {
        'download_url': source_url,
    }
