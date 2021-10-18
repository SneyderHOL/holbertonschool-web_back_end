#!/usr/bin/env python3
"""Duck typing - first element of a sequence"""
from typing import Sequence, Union, Any


def safe_first_element(lst: Sequence[Any]) -> Union[Any, None]:
    """safe_first_element: type-annotated function that takes a sequence and
       returns any object
    Args:
       lst: a sequence of any type
    Return:
       an object of any type
    """
    if lst:
        return lst[0]
    else:
        return None
