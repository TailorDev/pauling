from jinja2.filters import do_striptags

FIGSHARE_URL_PATTERN = 'https://figshare.com/.+/(\d+)'
FIGSHARE_API_URL = 'https://api.figshare.com/v2/articles'


def extract_data(data):
    files = data.get('files')
    return {
        'title': data.get('title', ''),
        'authors': ', '.join([a.get('full_name') for a in data.get('authors')]) if data.get('authors') else '',
        'abstract': do_striptags(data.get('description', '')),
        'download_url': files[0].get('download_url') if files and len(files) else '',
        'presented_at': '',
    }
