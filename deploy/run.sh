#!/bin/bash
export RAILS_ENV=production

if [ $(ps -ef | grep rails | grep -v grep | awk '{print $2}') ]; then
    kill -9 $(ps -ef | grep rails | grep -v grep | awk '{print $2}') &>/dev/null
    echo "Killing rails"
fi

if [ $(ps -ef | grep router.py | grep -v grep | awk '{print $2}') ]; then
    kill -9 $(ps -ef | grep router.py | grep -v grep | awk '{print $2}') &>/dev/null
    echo "Killing router.py"
fi

cd ~/blockytalky-ror/btp
rails s -d
cd ~/blockytalky/backend
./router.py >> ~/dax.log 2>&1 &
