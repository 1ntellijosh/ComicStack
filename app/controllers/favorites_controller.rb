class FavoritesController < ApplicationController
  #skip_before_action :verify_authenticity_token

  # post new favorite linking table
  def create
    render json: Favorite.create(params["favorite"])
  end

  # Get all favorites for particular person
  def index
    render json: Favorite.all(params["id"])
  end

  # delete one (by id)
  def delete
    render json: Favorite.delete(params["id"])
  end

end
