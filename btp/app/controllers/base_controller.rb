class BaseController < ApplicationController
    def code_exists!
        begin
            @code = Code.find(params[:id])
        rescue ActiveRecord::RecordNotFound
            flash[:alert] = "This code does not exist"
            redirect_to code_index_path
        end
    end

    def btu_exists!
        begin
            @btu = Btu.find(params[:id])
        rescue ActiveRecord::RecordNotFound
            flash[:alert] = "This BTU does not exist"
            redirect_to btu_index_path
        end
    end
end

