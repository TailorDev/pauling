from io import BytesIO

import qrcode
import qrcode.image.svg


def make_svg(poster):
    buf = BytesIO()
    qr = qrcode.QRCode(border=6)
    qr.add_data(poster.public_url(absolute=True))
    img = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
    img.save(buf)
    buf.seek(0)
    return buf
