from io import BytesIO

import qrcode
import qrcode.image.svg
from PIL import Image, ImageColor, ImageDraw, ImageFont


def make_png(poster):
    buf = BytesIO()
    qr = qrcode.QRCode(border=6)
    qr.add_data(poster.public_url(absolute=True))
    img = qr.make_image()
    img_draw = ImageDraw.Draw(img)
    font = ImageFont.truetype('Lato-Medium.ttf', 24)
    img_draw.text((70, 3), 'Want this poster on your phone?', font=font)
    img_draw.text((53, 450), 'Use the Pauling app on Android/iOS', font=font)
    img.save(buf)
    buf.seek(0)
    return buf
