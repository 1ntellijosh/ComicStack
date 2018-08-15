class QueriesController < ApplicationController
  #skip_before_action :verify_authenticity_token

  # get search result from new search or pagination existing search results
  def find
    query = params["query"]
    filter = params["filter"]
    page = params["page"]
    render json: Query.find(query, filter, page)
  end

  # full more information on volume, information
  def pull
    resource_type = params["resource_type"]
    id = params["identifier"]
    render json: Query.pull(resource_type, id)
  end

end
