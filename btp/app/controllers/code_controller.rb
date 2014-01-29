class CodeController < ApplicationController
    before_filter :authenticate_user!
    def show
        @user = current_user
        @code = Code.find(params[:id])
        if(!@code.owned_by?(@user))
            redirect_to '/'
        end
    end

    def new
        @user = current_user
        @code = @user.codes.new
    end

    def update
        @code = Code.find(params[:id])
        if(@code.update_attributes(params[:code], {:codetext => :codetext, :title => :title}))
            redirect_to @code
        end
    end

    def create
        @code = current_user.codes.new(params[:code])
        if @code.save
            redirect_to @code
        else
            render "new" #Hopefully this won't happen because then we lose progress
        end
    end
end
