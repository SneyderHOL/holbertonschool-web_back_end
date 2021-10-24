#!/usr/bin/env python3
"""Caching system - LRU Caching"""

BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """LRU Caching system with a Least Recently Used
       cache replacement policy
    """
    def __init__(self):
        """Class Initializer"""
        super().__init__()

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return
        if key in self.cache_data:
            del(self.cache_data[key])
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            least_recent = list(self.cache_data)[0]
            print('DISCARD: {}'.format(least_recent))
            del(self.cache_data[least_recent])

    def get(self, key):
        """Get an item by key"""
        if key is None:
            return None
        try:
            value = self.cache_data[key]
            del(self.cache_data[key])
            self.cache_data[key] = value
            return value
        except KeyError:
            return None
