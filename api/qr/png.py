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
    font_title = ImageFont.truetype('Lato-Medium.ttf', 24)
    font = ImageFont.truetype('Lato-Medium.ttf', 18)
    img_draw.text((45, 3), 'View this poster with the Pauling app*', font=font_title)
    img_draw.text((100, 440), '*install the iPhone/Android app via', font=font)
    img_draw.text((140, 460), 'pauling.lelab.tailordev.fr', font=font)
    img.save(buf)
    buf.seek(0)
    return buf
