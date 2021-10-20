#!/usr/bin/env python3

from distutils.core import setup

setup(
    name="dogsearch_api",
    version="1.0",
    description="Dog Search (API)",
    author="Vadim Alimguzhin",
    author_email="vadim.alimguzhin@gmail.com",
    packages=["dogsearch.api"],
    install_requires=["flask==1.1.2", "flask-restful==0.3.8", "flask-cors"],
)
