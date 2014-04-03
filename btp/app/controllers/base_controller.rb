class BaseController < ApplicationController
    def code_exists!
        begin
            @code = Code.find(params[:id])
            return true
        rescue ActiveRecord::RecordNotFound
            flash[:alert] = "This code does not exist"
            redirect_to code_index_path
            return false
        end
    end

    def btu_exists!
        begin
            @btu = Btu.find(params[:id])
            if @btu.user != current_user
                flash[:alert] = "You do not own this BTU"
                redirect_to btu_index_path
            end
        rescue ActiveRecord::RecordNotFound
            flash[:alert] = "This BTU does not exist"
            redirect_to btu_index_path
        end
    end
end

