#!/usr/bin/env python3
"""Basic Flask App"""
from flask import Flask, render_template, request, g
from flask_babel import Babel
from typing import Union
import pytz


app = Flask(__name__)
babel = Babel(app)


class Config:
    """Basic Babel setup class"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object('7-app.Config')


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> Union[dict, None]:
    """Mock user loggin in, function returns a user dictionary or
        None if the ID cannot be found or if login_as was not passed"""
    user_id = request.args.get('login_as')
    if user_id:
        user = int(user_id)
        if user in users:
            return users.get(user)
    else:
        return None


@app.before_request
def before_request():
    """Before request method"""
    user = get_user()
    g.user = user


@app.route('/', methods=['GET'], strict_slashes=False)
def index() -> str:
    """Index route"""
    return render_template('7-index.html')


@babel.localeselector
def get_locale():
    """Get locale from request"""
    lc_string = 'locale'
    locale = request.args.get(lc_string)
    if locale and locale in Config.LANGUAGES:
        return locale
    if g.user:
        locale = g.user.get(lc_string)
        if locale and locale in Config.LANGUAGES:
            return locale
    locale = request.headers.get(lc_string)
    if locale and locale in Config.LANGUAGES:
        return locale
    return request.accept_languages.best_match(Config.LANGUAGES)


@babel.timezoneselector
def get_timezone() -> str:
    """Infer appropriate time zone"""
    tz_string = 'timezone'
    if request.args.get(tz_string):
        timezone = request.args.get(tz_string)
    elif g.user and g.user.get(tz_string):
        timezone = g.user.get(tz_string)
    else:
        timezone = Config.BABEL_DEFAULT_TIMEZONE
    try:
        tz = pytz.timezone(timezone)
    except pytz.exceptions.UnknownTimeZoneError:
        timezone = 'UTC'
    return timezone


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
