Pauling
=======

[![CircleCI](https://circleci.com/gh/TailorDev/pauling/tree/master.svg?style=svg&circle-token=9df05dcadb0db10e2a6385385cbb62e1500a0e9f)](https://circleci.com/gh/TailorDev/pauling/tree/master)


## Installation

### API (web app)

1. Install the project dependencies:

```
$ make boostrap
```

2. Create a `local_settings.py` file with your own settings:

``` py
# flask
FLASK_DEBUG = True
SECRET_KEY  = 'Secr3tK3yF0rD3v'

# mailer
MAIL_SERVER   = '127.0.0.1'
MAIL_PORT     = 15025
MAIL_LOGIN    = ''
MAIL_PASSWORD = ''
MAIL_USE_TLS  = False

# upload/cdn
CLOUDINARY_URL      = 'cloudinary://user:pass@account'
CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/account'
```

3. Start the application in development mode:

```
$ make dev
```

4. Last but not least, apply the database migrations:

```
$ make flask-db-upgrade
```

You can now browse the application at: http://127.0.0.1:5000/.
