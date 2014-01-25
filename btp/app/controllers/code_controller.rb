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
	@code = @user.codes.new("")
        @code.save
        redirect_to @code
    end
    def edit
    end
    def update
        @code = Code.find(params[:id])
        #if(@code.update(params[:code].permit(:codetext)))
        if(@code.update_attributes(params[:code], {:codetext => :codetext}))
            redirect_to @code
        end
    end
end
