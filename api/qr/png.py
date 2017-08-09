import os
from io import BytesIO

import qrcode
import qrcode.image.svg
from PIL import Image, ImageColor, ImageDraw, ImageFont

img_dir = os.path.dirname(os.path.abspath(__file__))

def make_png(poster):
    buf = BytesIO()
    qr = qrcode.QRCode(border=6)
    qr.add_data(poster.public_url(absolute=True))
    code = qr.make_image()
    code = code.resize((490, 490), resample=Image.BICUBIC)
    img = Image.open('{}/qr-template.png'.format(img_dir))
    img.paste(code, (5, 105))
    img.save(buf, format='png')
    buf.seek(0)
    return buf
