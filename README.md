Pauling
=======

| General | Android | iOS |
|---------|---------|-----|
| [![CircleCI](https://circleci.com/gh/TailorDev/pauling/tree/master.svg?style=svg&circle-token=9df05dcadb0db10e2a6385385cbb62e1500a0e9f)](https://circleci.com/gh/TailorDev/pauling/tree/master) | [![BuddyBuild](https://dashboard.buddybuild.com/api/statusImage?appID=59a965b8c5290b0001524019&branch=master&build=latest)](https://dashboard.buddybuild.com/apps/59a965b8c5290b0001524019/build/latest?branch=master) | [![BuddyBuild](https://dashboard.buddybuild.com/api/statusImage?appID=59a96b15b0d15500017f75fd&branch=master&build=latest)](https://dashboard.buddybuild.com/apps/59a96b15b0d15500017f75fd/build/latest?branch=master)


Pauling is an open-source solution to get a better experience with scientific
posters. Authors share their poster _via_ the Pauling web application and
receive a QR code that should be added next to the poster during the session.
Conference attendees use the Pauling mobile application to retrieve the poster
and all its information on their mobile phone! This application has been built
during a "Le lab" session:

* https://tailordev.fr/blog/2017/10/04/le-lab-6-pauling-poster-sharing-mobile-app/


## Installation

### API (web app)

You have to navigate to the `api/` folder first.

1. Install the project dependencies:

```
$ make boostrap
```

2. Create a `local_settings.py` file with your own settings:

``` py
# flask
SECRET_KEY = 'Secr3tK3yF0rD3v'

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


### Mobile app

You have to navigate to the `mobile/` folder first.

1. Be sure to have the [React Native environment installed
   first](https://facebook.github.io/react-native/docs/getting-started.html),
   then install the project dependencies:

```
$ make boostrap
```

2. Start a Android device of your choice. It can be a virtual device (with
   `emulator`) or a real device connected to your computer:

```
$ emulator @Nexus_5X_API_25_x86
```

3. Start the application in development mode (Android):

```
$ make dev
```

#### Sketch file

We use [Git LFS](https://git-lfs.github.com/) to track the Sketch files so that
the size of the repository does not get to big too fast. Be sure to have it
installed :) You can retrieve the files (if you do not have them) by fetching
them:

```
$ git lfs fetch
```

## Contributing

Please, see the [CONTRIBUTING](CONTRIBUTING.md) file.

## Contributor Code of Conduct

Please note that this project is released with a [Contributor Code of
Conduct](http://contributor-covenant.org/). By participating in this project you
agree to abide by its terms. See the [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) file.

## License

Pauling is released under the MIT License. See the bundled [LICENSE](LICENSE)
file for details.
