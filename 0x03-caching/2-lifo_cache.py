#!/usr/bin/env python3
"""Caching system - LIFO Caching"""

BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """LIFO Caching system with a Last In First Out
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
        if len(self.cache_data) == BaseCaching.MAX_ITEMS:
            last = list(self.cache_data)[-1]
            print('DISCARD: {}'.format(last))
            del(self.cache_data[last])
        self.cache_data[key] = item

    def get(self, key):
        """Get an item by key"""
        if key is None:
            return None
        try:
            return self.cache_data[key]
        except KeyError:
            return None
