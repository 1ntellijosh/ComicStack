class OwnsController < ApplicationController
  #skip_before_action :verify_authenticity_token

  # post new owner linking table
  def create
    render json: Own.create(params["own"])
  end

  # Get collection for particular person
  def show
    render json: Own.find(params["id"])
  end

  # delete one (by id)
  def delete
    render json: Own.delete(params["id"])
  end

end
