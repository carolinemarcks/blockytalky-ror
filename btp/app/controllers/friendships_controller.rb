# Very simple controller with two operations: requesting and accepting friendships.  Most of the logic is encapsulated in the <b>amistad</b> gem, so this controller takes advantage of the user.invite and user.confirm functions.

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

    def approve_friend
        @friend = User.find(params[:id])
        current_user.approve @friend
        redirect_to :back
    end
end
