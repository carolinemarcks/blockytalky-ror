#!/bin/sh

find . -name '*.js' -print0 | xargs -0 sed -i -e "s/\"static/\"\/static/"
find . -name '*.js' -print0 | xargs -0 sed -i -e "s/\'static/\'\/static/"

find . -name '*.js-e' -print0 | xargs -0 rm
