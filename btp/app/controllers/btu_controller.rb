class BtuController < ApplicationController
    before_filter :authenticate_user!

    def show
        @user = current_user
        @btu = Btu.find(params[:id])
        if(!@btu.owned_by?(@user))
            redirect_to root_path
        end
    end

    def new
        @user = current_user
        @btu = @user.btus.new
        @btu.save
        redirect_to @btu
    end

    def index
        @user = current_user
    end

    def update
        @btu = Btu.find(params[:id])
        @btu.update_attributes(params[:btu], {:btuID => :btuID, :title => :title})
        redirect_to root_path
    end

    def destroy
        @user = current_user
        @user.btus.delete_if{|o| o.id == params[:id]}
        @btu = Btu.find(params[:id])
        @btu.destroy
        redirect_to root_path
    end
end
