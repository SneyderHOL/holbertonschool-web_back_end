#!/usr/bin/env python3
"""Auth module"""

from flask import request
from typing import List, TypeVar


class Auth():
    """Template for all authentication system"""
    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        """Defines which routes don't need authentication
        Return:
          - boolean indicating if route need authentication
        """
        return False

    def authorization_header(self, request=None) -> str:
        """Validate request
        Rerturn:
           - value of header request Authorization, None otherwise
        """
        return None

    def current_user(self, request=None) -> TypeVar('User'):
        """Return the current user
        """
        return None
