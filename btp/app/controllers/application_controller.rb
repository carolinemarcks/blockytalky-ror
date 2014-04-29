# the controller that all others inherit from -- used to protect against forgery and manage 404s
class ApplicationController < ActionController::Base
    protect_from_forgery
    def render_404
          raise ActionController::RoutingError.new('Not Found')
    end
end
