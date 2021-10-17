#!/usr/bin/env python3

from distutils.core import setup

setup(
    name="dogsearch",
    version="1.0",
    description="Dog Search",
    author="Vadim Alimguzhin",
    author_email="vadim.alimguzhin@gmail.com",
    packages=["dogsearch"],
    install_requires=["flask==1.1.2", "flask-restful==0.3.8", "flask-cors", "requests"],
)
