blockytalky-ror
===============

Rails site for blocky talky project

The blockytalky code can be found on https://github.com/tufts-LPC/blockytalky

Installing
==========
If you're on Ubuntu, you'll need the ``libmysqlclient-dev`` and ``mysql-server`` packages (which can
be installed with apt-get).

To create the database:

    rake db:create

to migrate / add devise tables:
    
    rake db:migrate

Blockly
=======
For now, to access the blockly playground, point your browser at:
file:///[your path to blockytalky-ror]/static/apps/code/code2.html

to add blocks, add a block AND generator to the appropriate file in the static/generators/python directory, and add a place for the block in the template.soy and template2.soy files in static/apps/code.  Then compile the templates with the commands at the top of the .soy files.

Devise
======
To disable mandated login, change /config/routes.rb to have the default root be "userwelcome#index"
please change it back when comitting!
when making a new controller, add:
    class XXX < LLL
        before_filter :authenticate_user!
    ...
    end

Adding Sample Data
==================
To add sample data (100 users), run the following command:

    bundle exec rake db:populate

Useful documentation for gems
=============================
Amistad: https://github.com/raw1z/amistad/wiki
Paper_trail: https://github.com/airblade/paper_trail

