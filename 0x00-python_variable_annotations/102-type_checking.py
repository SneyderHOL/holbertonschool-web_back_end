#!/usr/bin/env python3
"""Duck typing - type checking"""
from typing import Tuple, List


def zoom_array(lst: Tuple, factor: int = 2) -> List:
    """zoom_array: type-annotated function that takes a tuple
       and returns list
    Args:
       lst: a tuple to operate
       factor: an integer value to operate
    Return:
       a list
    """
    zoomed_in: List = [
        item for item in lst
        for i in range(factor)
    ]
    return zoomed_in


array = (12, 72, 91)

zoom_2x = zoom_array(array)

zoom_3x = zoom_array(array, 3)
