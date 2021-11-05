#!/usr/bin/env python3
"""Basic Auth module"""

from api.v1.auth.auth import Auth
from flask import request
from typing import List, TypeVar
from models.user import User
import base64


class BasicAuth(Auth):
    """Basic Authentication system"""
    def extract_base64_authorization_header(self,
                                            authorization_header: str) -> str:
        """Returns the Base64 part of the Authorization header"""
        if authorization_header is None or\
           type(authorization_header) is not str or\
           authorization_header[0:6] != 'Basic ':
            return None
        return authorization_header[6:]

    def decode_base64_authorization_header(self,
                                           base64_authorization_header: str
                                           ) -> str:
        """Return the decoded Base64 part of the Authorization header"""
        if base64_authorization_header is None or\
           type(base64_authorization_header) is not str:
            return None
        try:
            binary_header = base64_authorization_header.encode('utf-8')
            binary_header_decoded = base64.b64decode(binary_header)
            return binary_header_decoded.decode('utf-8')
        except Exception:
            return None

    def extract_user_credentials(self,
                                 decoded_base64_authorization_header: str
                                 ) -> (str, str):
        """Returns the user email and password from the Base64 decoded value"""
        if decoded_base64_authorization_header is None or\
           type(decoded_base64_authorization_header) is not str or\
           ':' not in decoded_base64_authorization_header:
            return (None, None)
        return tuple(decoded_base64_authorization_header.split(':'))

    def user_object_from_credentials(self, user_email: str,
                                     user_pwd: str) -> TypeVar('User'):
        """Returns the User instance based on his email and password"""
        if user_email is None or user_pwd is None:
            return None
        if type(user_email) is not str or type(user_pwd) is not str:
            return None
        try:
            user = User.search({'email': user_email})
        except KeyError:
            return None
        user = user[0] if len(user) != 0 else None
        if user:
            return user if user.is_valid_password(user_pwd) else None
        return None
