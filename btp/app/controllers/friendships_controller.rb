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

    def remove_friend
        @friend = User.find(params[:id])
        current_user.remove_friendship @friend
        redirect_to :back
    end
end
