class QueriesController < ApplicationController
  #skip_before_action :verify_authenticity_token

  # get one (by id)
  def find
    query = params["query"]
    filter = params["filter"]
    page = params["page"]
    render json: Query.find(query, filter, page)
  end

end
