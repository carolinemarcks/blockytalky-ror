require "uri"
require "net/http"

class CodeDeployController < BaseController
    before_filter :authenticate_user!
    before_filter :printShit
    before_filter :code_exists!, only: [:upload_code]
    before_filter :btu_exists!, only: [:upload_code, :stop_code]

    #TODO: make sure user owns btu

    def printShit
        p "I'm about to upload!!"
    end

    def upload_code
        @btu.send_upload @code
        render text: "OK"
    end

    def stop_code
        @btu.send_stop
        render text: "OK"
    end

end
