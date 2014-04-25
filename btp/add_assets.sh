#!/bin/sh

rake assets:precompile
cp -r other/static public/assets/
