from flask import render_template
from flask_mail import Mail, Message

mail = Mail()


def send_admin_info(poster, sender):
    subject = '[Pauling] Information for your poster "{}"'.format(poster.title)
    msg = Message(
        subject,
        sender=sender,
        recipients=[poster.email],
        body=render_template('emails/admin_info.txt', poster=poster),
        html=render_template('emails/admin_info.html', subject=subject, poster=poster),
    )
    mail.send(msg)
