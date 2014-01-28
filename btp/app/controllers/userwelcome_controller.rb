class UserwelcomeController < ApplicationController
    before_filter :authenticate_user!
    def index
	@user = current_user
    end
    def show_frame
    end
    def destroy
        @user = current_user
        @user.codes.delete_if{|o| o.id == params[:id]}
        @code = Code.find(params[:id])
        @code.destroy
        redirect_to root_path
    end
end
