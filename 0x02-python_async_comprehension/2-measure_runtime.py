#!/usr/bin/env python3
"""Run time for four parallel comprehensions module"""
import asyncio
import time
async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """type-annotated coroutine that will execute async_comprehension four
        times in parallel using asyncio.gather
    """
    initial = time.time()
    await asyncio.gather(async_comprehension(), async_comprehension(),
                         async_comprehension(), async_comprehension())
    end = time.time()
    return (end - initial)
