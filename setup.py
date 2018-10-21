#!/usr/bin/env python

from setuptools import setup

setup(name='Template',
      version='0.1',
      description='Rest API Template',
      license='MIT',
      packages=['application'],
      install_requires=[
          'flask',
          'flask_restful',
          'python-dotenv',
          'jsonschema',
          'flask-caching'
      ],
zip_safe=False)