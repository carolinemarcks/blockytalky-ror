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
    end

    def index
        @user = current_user
    end

    def create
        @btu = current_user.btus.new(params[:btu])
        if @btu.save
            redirect_to @btu
        else
            render "new"
        end
    end

    def update
        @btu = Btu.find(params[:id])
        if @btu.update_attributes(params[:btu], {:btuID => :btuID, :title => :title})
            redirect_to root_path
        else
            render "show"
        end
    end

    def destroy
        @user = current_user
        @user.btus.delete_if{|o| o.id == params[:id]}
        @btu = Btu.find(params[:id])
        @btu.destroy
        redirect_to btu_index_path
    end
end
