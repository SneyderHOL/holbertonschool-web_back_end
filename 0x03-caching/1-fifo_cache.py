#!/usr/bin/env python3
"""Caching system - FIFO Caching"""

BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """FIFO Caching system with a First In First Out
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
            first = list(self.cache_data)[0]
            print('DISCARD: {}'.format(first))
            del(self.cache_data[first])

    def get(self, key):
        """Get an item by key"""
        if key is None:
            return None
        try:
            return self.cache_data[key]
        except KeyError:
            return None
