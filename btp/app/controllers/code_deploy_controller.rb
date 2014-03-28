require "uri"
require "net/http"

class CodeDeployController < ApplicationController
    before_filter :authenticate_user!
    before_filter :code_exists!, only: [:upload_code]
    before_filter :btu_exists!, only: [:upload_code, :run_code, :stop_code]

    #TODO: make sure user owns btu

    def btu_exists!
        begin
            @btu = Btu.find(params[:id])
        rescue ActiveRecord::RecordNotFound
            flash[:alert] = "This BTU does not exist"
            redirect_to btu_index_path
        end
    end

    def code_exists!
        begin
            @code = Code.find(params[:code_id])
        rescue ActiveRecord::RecordNotFound
            flash[:alert] = "This code does not exist"
            redirect_to code_index_path
        end
    end

    def run_code
        @btu.send_run
        render text: "OK"
    end

    def stop_code
        @btu.send_stop
        render text: "OK"
    end

end
