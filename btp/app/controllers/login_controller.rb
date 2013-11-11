class LoginController < ApplicationController
  def index #GET
  end
  def create #POST
    username = params[:un]
    password = params[:pw]
    Rails.logger.debug params.inspect
    redirect_to(root_path) 
  end
end
