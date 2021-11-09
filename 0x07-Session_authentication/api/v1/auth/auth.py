#!/usr/bin/env python3
"""Auth module"""

from flask import request
from typing import List, TypeVar
import os


class Auth():
    """Template for all authentication system"""
    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        """Defines which routes don't need authentication
        Return:
          - boolean indicating if route need authentication
        """
        if path is None or excluded_paths is None or len(excluded_paths) == 0:
            return True
        if path[-1] != '/':
            path += '/'
        return False if path in excluded_paths else True

    def authorization_header(self, request=None) -> str:
        """Validate request
        Rerturn:
           - value of header request Authorization, None otherwise
        """
        if request is None or 'Authorization' not in request.headers:
            return None
        return request.headers['Authorization']

    def current_user(self, request=None) -> TypeVar('User'):
        """Return the current user
        """
        return None

    def session_cookie(self, request=None):
        """Returns a cookie value from a request"""
        if request is None:
            return None
        return request.cookies.get(os.getenv('SESSION_NAME'))
