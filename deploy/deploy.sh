#!/bin/bash
set -x
cd ~
sudo apt-get update
sudo apt-get -y install git vim curl python-pip python-devel build-essential libmysqlclient-dev mysql-server nginx
sudo pip install tornado
sudo pip install jsonpickle

#Install rails
curl -L get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
rvm requirements
rvm install 1.9.3
rvm --default use 1.9.3
ruby -v
gem install rails -v 3.2.16

if [ ! -f blockytalky-ror ]; then
    git clone https://github.com/carolinemarcks/blockytalky-ror.git
fi

if [ ! -f blockytalky ]; then
    git clone https://github.com/tufts-LPC/blockytalky.git
fi

cd ~/blockytalky-ror/deploy
sudo cp nginxConfig /etc/nginx/sites-available/default

ln -s ~/blockytalky-ror/deploy/run.sh ~/

cd ~/blockytalky-ror/btp
export RAILS_ENV=production
bundle install
rake db:create
rake db:migrate
bundle exec rake assets:precompile RAILS_ENV=production

