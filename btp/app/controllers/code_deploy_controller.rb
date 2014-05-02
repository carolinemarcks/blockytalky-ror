# The code deploy controller acts as an intermediary between HTTP routes for stopping / uploading code and the code that actually performs said operations.

require "uri"
require "net/http"

class CodeDeployController < BaseController
    before_filter :authenticate_user!
    before_filter :btu_exists!, only: [:upload_code, :stop_code]

    def upload_code
        begin
            # TODO take into account versions
            code = Code.find(params[:code_id])
            @btu.send_upload code
            render text: "OK"
            flash[:notice] = "Code sent to BTU!"
        rescue ActiveRecord::RecordNotFound
            render_404
        end
    end

    def stop_code
        @btu.send_stop
        render text: "OK"
        flash[:notice] = "Stop command sent to BTU"
    end

end
