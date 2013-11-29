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



Blockly
=======
For now, to access the blockly playground, point your browser at:
file:///[your path to blockytalky-ror]/static/apps/code/code2.html

to add blocks, add a block AND generator to the appropriate file in the static/generators/python directory, and add a place for the block in the template.soy and template2.soy files in static/apps/code.  Then compile the templates with the commands at the top of the .soy files.
