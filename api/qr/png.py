import os
from io import BytesIO

import qrcode
import qrcode.image.svg
from PIL import Image, ImageColor, ImageDraw, ImageFont

img_dir = os.path.dirname(os.path.abspath(__file__))

def make_png(poster):
    buf = BytesIO()
    code = qrcode.make(poster.public_url(absolute=True))
    code = code.resize((500, 500), resample=Image.BICUBIC)
    img = Image.open('{}/qr-template.png'.format(img_dir))
    img.paste(code, (0, 100))
    img.save(buf, format='png')
    buf.seek(0)
    return buf
