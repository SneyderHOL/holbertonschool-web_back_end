#!/usr/bin/env python3
"""Complex types - functions"""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """make_multiplier: type-annotated function that takes a float and returns
       a function that multiplies a float by multiplier
    Args:
       multiplier: float to perform operation
    Return:
       a function that mulitiplies a float by multiplier
    """
    def f(n: float) -> float:
        """f: function that multiplies n by multiplier"""
        return n * multiplier

    return f
