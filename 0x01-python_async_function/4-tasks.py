#!/usr/bin/env python3
"""Tasks module"""
from typing import List
import asyncio
task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """task_wait_n: type-annotated coroutine that takes in two integer
       arguments that will call wait_random n times
    """
    lst = []
    ordered_list = []

    for i in range(n):
        lst.append(task_wait_random(max_delay))

    for res in asyncio.as_completed(lst):
        compl = await res
        ordered_list.append(compl)

    return ordered_list
