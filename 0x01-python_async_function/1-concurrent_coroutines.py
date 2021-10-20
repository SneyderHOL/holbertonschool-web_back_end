#!/usr/bin/env python3
"""Multiple coroutines at the same time with async module"""
from typing import List
import asyncio
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """wait_n: type-annotated coroutine that takes in two integer arguments
       that will call wait_random n times
    """
    lst = []
    ordered_list = []

    for i in range(n):
        lst.append(wait_random(max_delay))

    for res in asyncio.as_completed(lst):
        compl = await res
        ordered_list.append(compl)

    return ordered_list
