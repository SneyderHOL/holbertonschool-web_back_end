#!/usr/bin/env python3
"""Duck typing - more involved type annotations"""
from typing import Union, Any, TypeVar, Mapping

T = TypeVar('T')


def safely_get_value(dct: Mapping, key: Any,
                     default: Union[T, None] = None) -> Union[Any, T]:
    """safely_get_value: type-annotated function that takes a dictionary
       returns any object
    Args:
       dct: a dictionary
       key: a value of any type
       default: a value of type TypeVar or None
    Return:
       an object of any type or TypeVar
    """
    if key in dct:
        return dct[key]
    else:
        return default
