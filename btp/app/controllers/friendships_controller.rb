class FriendshipsController < ApplicationController
    before_filter :authenticate_user!

    def request_friend
        @user = User.find(params[:id])
        @friend = User.find(params[:friend_id])
        #if !@friend
        #    redirect_to :back
        #end
        @user.invite @friend
        redirect_to :back
    end
end
