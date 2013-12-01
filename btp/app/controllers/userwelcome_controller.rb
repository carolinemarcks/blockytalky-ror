class UserwelcomeController < ApplicationController
    before_filter :authenticate_user!
    def index   
    end
end
