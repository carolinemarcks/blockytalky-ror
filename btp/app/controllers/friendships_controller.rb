class FriendshipsController < ApplicationController
    before_filter :authenticate_user!

    def request_friend
        @friend = User.find(params[:id])
        #if !@friend
        #    redirect_to :back
        #end
        current_user.invite @friend
        redirect_to :back
    end
end
