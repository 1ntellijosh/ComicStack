class Query

    # ==================================================
    #                      ROUTES
    # ==================================================
    require 'net/http'
    require "http"


    # get one by id
    def self.find(query, filter, page)
      p "in query class"
      p query
      #change any filter to none
      if filter == 'any'
        filter = ''
      end
      #format spaces for url
      queryStr = query.split('')
      for i in 0...queryStr.length do
        if queryStr[i] == ' '
          queryStr[i] = '%20'
        end
      end
      query = queryStr.join('')
      #grab response
      response = HTTP.get("https://comicvine.gamespot.com/api/search/?api_key=4b0e3b0f6a9224f1f5a13f757d9514dc3f387840&format=json&sort=name:asc&limit=50&resources=" + filter + "&query=" + query + '&page=' + page)

      return response.to_s
    end


end
