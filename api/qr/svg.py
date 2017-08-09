import os
from io import BytesIO
from qrcode.image.svg import ET

import qrcode
import qrcode.image.svg


img_dir = os.path.dirname(os.path.abspath(__file__))

def make_svg(poster):
    qr = qrcode.QRCode()
    qr.add_data(poster.public_url(absolute=True))
    img = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
    code = ET.tostring(img.make_path()).decode('UTF-8')
    with open('{}/qr-template.svg'.format(img_dir)) as f:
        data = f.read()
    return BytesIO(data.format(**{
        'title': poster.id,
        'code': code,
    }).encode())
