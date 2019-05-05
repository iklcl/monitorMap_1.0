#!/usr/bin/python
#encoding:utf-8
import sys
sys.path.append("..")
from flask import Blueprint
home = Blueprint("home", __name__)

import  app.home.views