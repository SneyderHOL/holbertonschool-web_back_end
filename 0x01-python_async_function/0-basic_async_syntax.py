#!/usr/bin/env python3
"""The basics of async module"""
import random
import asyncio


async def wait_random(max_delay: int = 10) -> float:
    """wait_random: type-annotated coroutine that takes in an integer argument
       that waits for a random delay between 0 and max_delay seconds
    Args:
       max_delay: integer number use as an end-point value in random
    Return:
       a random number to wait
    """
    num = random.uniform(0, max_delay)
    await asyncio.sleep(num)
    return num
