#!/usr/bin/env python3
"""Redis Basic module"""
import redis
import uuid
from typing import Union, Optional, Callable


def count_class():
    """System to count how many times methods of the Cache class are called"""
    pass


class Cache:
    """Cache class"""
    def __init__(self):
        """Initialize a Cache instance"""
        self._redis = redis.Redis()
        self._redis.flushdb()

    def store(self, data: Union[str, bytes, int, float]) -> str:
        """Store the input data in Redis using the random key
           and return the key"""
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn: Optional[Callable] = None) -> Union[
            str, bytes, int, float]:
        """Reading from Redis and recovering original type"""
        if key is None:
            return None
        value = self._redis.get(key)
        if value is None or fn is None:
            return value
        return fn(value)

    def get_str(self, key: str) -> str:
        """Conversion function to string"""
        if key is None:
            return None
        return self.get(key, str)

    def get_int(self, key: str) -> int:
        """Conversion function to integer"""
        if key is None:
            return None
        return self.get(key, int)
