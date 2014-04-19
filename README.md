#blockytalky-ror

Rails site for blocky talky project

The blockytalky code can be found on https://github.com/tufts-LPC/blockytalky

#Installing

If you're on Ubuntu, you'll need the ``libmysqlclient-dev``, ``mysql-server``,
``postgresql``, and ``postgresql-client`` packages (which can be installed with
apt-get).

To create the database:

    rake db:create

to migrate / add devise tables:
    
    rake db:migrate

#Blockly

For now, to access the blockly playground, point your browser at:
file:///[your path to blockytalky-ror]/static/apps/code/code2.html

to add blocks, add a block AND generator to the appropriate file in the static/generators/python directory, and add a place for the block in the template.soy and template2.soy files in static/apps/code.  Then compile the templates with the commands at the top of the .soy files.

#Devise

To disable mandated login, change /config/routes.rb to have the default root be

"userwelcome#index"

please change it back when comitting!

when making a new controller, add:

    class XXX < LLL
        before_filter :authenticate_user!
    ...
    end

#Adding Sample Data

To add sample data (100 users), run the following command:

    bundle exec rake db:populate

#Useful documentation for gems

Amistad: https://github.com/raw1z/amistad/wiki
Paper_trail: https://github.com/airblade/paper_trail

#Blocky Talky Portal Documentation

For starters, these docs assume a base understanding of Ruby on Rails app layout / functionality.  Please refer to http://guides.rubyonrails.org/v3.2.17/ for information about RoR.

##Controllers:

####*btu_controller:*
Straightforward controller meant to handle simple creation / deletion operations for a BTU ActiveRecord object. 
Most of the logic and code for deployment can be found in the BTU model.

####*code_controller:*
This controller handles the updating, creation, and deletion of code objects.  The controller has a few helper functions to check the permissions of the current user, but again is pretty straight forward.  
Since code is versioned using the paper_trail gem, methods that update / delete code also must take care to update the versions of the code as well.

####*code_deploy_controller:*
The code deploy controller acts as an intermediary between HTTP routes for stopping / uploading code and the code that actually performs said operations.

####*friendships_controller*:
Very simple controller with two operations: requesting and accepting friendships.  Most of the logic is encapsulated in the <b>amistad</b> gem, so this controller takes advantage of the user.invite and user.confirm functions.

####*users_ and userwelcome_controller*:
These controllers simply route users to the appropriate user object's view, and otherwise do nothing.

##Views:
####*homepage*
##Models:

####*Btu:*
This model contains information about each physical BTU.  This includes the 
unique identifier associated with the Btu, as well as who it belongs to and 
their own name for the Btu.  It contains methods pertaining to the uploading
of code to the Btu via a websocket to Dax. 

####*Code:*
This model stores the code segments.  The code is represented in an xml blob,
and also has a title, description, level of privacy, and concept of being owned
by a User. This model contains methods to fork code upon a user editing code
that was owned by other user.  This model also links to the paper trail gem
to assist in version control.

####*CodeUrl:*
In order for the blocky talky units to receive code segments, each segment is
hosted at a url.  On creation of an instance of this model, a guid for the
url is created, and associated with a piece of code.

####*User:*
The User model stores information about every person who has an account with
the website.  It uses the devise gem for most account management tasks such
as password and sign in information.  It also uses the friend model from the
amistad gem to manage friendships between users which affect privacy issues.
Additionally the user model stores an "about me" for each user, and information
about their school and status at the school. It has no methods, but many fields.
