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

    def upload_code
        uri = URI.parse(blockly_server + "upload")
        http = Net::HTTP.new(uri.host, uri.port)
        request = Net::HTTP::Post.new(uri.request_uri)
        request.body = @code.codetext
        begin
            response = http.request(request)
        rescue EOFError
        end
        logger.debug blockly_server
        redirect_to :back
    end

    def run_code
        url = blockly_server + "run"
        response = empty_post_request url
        if response.status != 200
            flash[:alert] = "Unable to run the code"
        end
        redirect_to :back
    end

    def stop_code
        url = blockly_server + "stop"
        response = empty_post_request url
        if response.status != 200
            flash[:alert] = "Unable to stop the code"
        end
        redirect_to :back
    end

    #TODO: sanitize this
    private
    def blockly_server
        "http://%s.broke-it.net:5000/" % @btu.title
    end

    def empty_post_request url
        Net::HTTP.post_form(URI.parse(url), {})
    end
end
