class CodeController < ApplicationController
    before_filter :authenticate_user!
    def show
        @code = Code.find(params[:id])
    end
    def new
        @code = Code.new("")
        @code.save
        redirect_to @code
    end
    def edit
    end
    def update
        @code = Code.find(params[:id])
        if(code.update(params[:code].permit(:codetext)))
            redirect_to @code
        end
    end
end
