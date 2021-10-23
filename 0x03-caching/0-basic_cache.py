#!/usr/bin/env python3
"""Caching system - Basic Cache"""

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """Basic Caching system with no cache replacement policy"""
    def __init__(self):
        """Class Initializer"""
        super().__init__()

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """Get an item by key"""
        if key is None:
            return None
        try:
            return self.cache_data[key]
        except KeyError:
            return None
