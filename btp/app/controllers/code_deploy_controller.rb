require "uri"
require "net/http"

class CodeDeployController < BaseController
    before_filter :authenticate_user!
    before_filter :code_exists!, only: [:upload_code]
    before_filter :btu_exists!, only: [:upload_code, :run_code, :stop_code]

    #TODO: make sure user owns btu

    def run_code
        @btu.send_run
        render text: "OK"
    end

    def stop_code
        @btu.send_stop
        render text: "OK"
    end

end
