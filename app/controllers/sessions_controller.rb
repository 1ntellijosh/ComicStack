class SessionsController < ApplicationController
  # authenticate_user is now a resource you can use on any method to make sure the client is authorized
  before_action :authenticate_user,  only: [:auth]

  # Public method
  def index
    render json: { service: 'auth-api', status: 200 }
  end

  # Authorized only method
  def auth
    render json: {
      status: 200,
      msg: "You are currently Logged-in as #{current_user.username}",
      username: current_user.username,
      id: current_user.id,
      email: current_user.email
    }
  end
end
