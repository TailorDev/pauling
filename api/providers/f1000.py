from bs4 import BeautifulSoup
from jinja2.filters import do_striptags

import re


F1000_URL_PATTERN = 'https://f1000research.com/posters/.+'

def extract_data(data):
    s = BeautifulSoup(data, 'lxml')
    title_el = s.find(class_='asset-title')
    authors_el = s.find(class_='asset-authors')
    abstract_el = s.find(id='summary-text-field')
    download_url_el = s.find('a', class_='download')
    presented_at_el = s.find(class_='asset-subcontainer__content--conf')
    return {
        'title': title_el.text.strip() if title_el else '',
        'authors': re.sub('\s+', ' ', authors_el.text).strip() if authors_el else '',
        'abstract': do_striptags(abstract_el.get('value')) if abstract_el else '',
        'download_url': download_url_el.get('data-url') if download_url_el else '',
        'presented_at': re.sub('\s+', ' ', presented_at_el.text).strip() if presented_at_el else '',
    }
