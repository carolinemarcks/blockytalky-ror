# Controller to route to appropiate user object view 

class UsersController < ApplicationController
    before_filter :authenticate_user!
    def index
        @users = User.all
    end

    def show
        @user = User.find(params[:id])
        # only allow visiting friends' pages 
        if !current_user.friends.include? @user
            flash[:alert] = "You are not friends with that user!"
            redirect_to users_path
        end
    end
end
