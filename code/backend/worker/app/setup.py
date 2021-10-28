#!/usr/bin/env python3

from distutils.core import setup

setup(
    name="dogsearch_worker",
    version="1.0",
    description="Dog Search (worker)",
    author="Vadim Alimguzhin",
    author_email="vadim.alimguzhin@gmail.com",
    packages=["dogsearch.worker"],
    install_requires=["pymongo"],
)
