class UserwelcomeController < ApplicationController
    before_filter :authenticate_user!
    def index
	@user = current_user
    end
    def show_frame
    end
end
