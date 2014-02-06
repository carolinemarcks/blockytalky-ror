class CodeController < ApplicationController
    before_filter :authenticate_user!
    def show
        @user = current_user
        @code = Code.find(params[:id])
        if(!@code.owned_by?(@user))
            if @user.friends.include? @code.user
                flash[:friend_code_id] = @code.id
                redirect_to new_code_path
            else
                flash[:error] = "You aren't friends with the owner of that code"
                redirect_to root_path
            end
        end
    end

    def new
        @user = current_user
        if not flash[:friend_code_id]
            @code = @user.codes.new
        else
            begin
                friend_code = Code.find_by_id(flash[:friend_code_id])
                @code = friend_code.dup
                @code.user = current_user
            rescue ActiveRecord::RecordNotFound
                flash[:error] = "The code you were trying to view has been deleted"
                @code = @user.codes.new
            end
        end
        Rails.logger.debug @code.inspect
    end

    def index
        @user = current_user
    end

    def update
        @code = Code.find(params[:id])
        @code.update_attributes(params[:code], {:codetext => :codetext, :title => :title, :description => :description})
        render "show"
    end

    def create
        @code = current_user.codes.new(params[:code])
        if @code.save
            redirect_to @code
        else
            render "new" #Hopefully this won't happen because then we lose progress
            
            # I think Rails keeps the data in the form (i.e. Rails magic takes care of it)
            # I tested with the non-empty title validation -G.S.
        end
    end

    def destroy
        @user = current_user
        @user.codes.delete_if{|o| o.id == params[:id]}
        @code = Code.find(params[:id])
        @code.destroy
        redirect_to root_path
    end
end
