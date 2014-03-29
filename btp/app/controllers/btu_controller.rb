class BtuController < BaseController
    before_filter :authenticate_user!
    before_filter :btu_exists!, only: [:show, :update, :destroy]

    def show
        @user = current_user
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
        @btu.update_attributes(params[:btu], {:btuID => :btuID, :title => :title})
        render "show"
    end

    def destroy
        @user = current_user
        @user.btus.delete_if{|o| o.id == params[:id]}
        @btu.destroy
        redirect_to btu_index_path
    end
end
