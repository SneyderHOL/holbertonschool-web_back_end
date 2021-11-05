#!/usr/bin/env python3
"""Basic Auth module"""

from api.v1.auth.auth import Auth
from flask import request
from typing import List, TypeVar


class BasicAuth(Auth):
    """Basic Authentication system"""
    def extract_base64_authorization_header(self,
                                            authorization_header: str) -> str:
        """Returns the Base64 part of the Authorization header
        """
        if authorization_header is None or\
           type(authorization_header) is not str or\
           authorization_header[0:6] != 'Basic ':
            return None
        return authorization_header[6:]
