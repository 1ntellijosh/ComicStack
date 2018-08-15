class Query

    # ==================================================
    #                      ROUTES
    # ==================================================
    require 'net/http'
    require "http"


    # get one by id
    def self.find(query, filter, page)
      p "in query class for find"
      p query
      #change any filter to issue, volume, or character
      if filter == 'any'
        filter = 'issue,volume,character'
      end
      #format spaces for url
      queryStr = query.split('')
      for i in 0...queryStr.length do
        if queryStr[i] == ' '
          queryStr[i] = '%20'
        end
      end
      query = queryStr.join('')

      fieldlist = "resource_type,id,name,deck,description,publisher,gender,image,real_name,description,issue_number,volume,cover_date,start_year,count_of_issue_apperances,count_of_issues,site_detail_url,count_of_issue_appearances"

      #grab response
      response = HTTP.get("https://comicvine.gamespot.com/api/search/?api_key=4b0e3b0f6a9224f1f5a13f757d9514dc3f387840&format=json&sort=name:asc&limit=50&resources=" + filter + "&field_list=" + fieldlist + "&query=" + query + '&page=' + page)

      return response.to_s
    end

    # pull more information on volume issue or character
    def self.pull(resource_type, id)
      p "in query class for pull"
      p resource_type
      p id

      fieldlist = "resource_type,id,name,deck,description,publisher,gender,image,real_name,description,issue_number,volume,cover_date,start_year,count_of_issue_apperances,count_of_issues,site_detail_url,count_of_issue_appearances"

      #change query depending on resource_type
      if resource_type == 'issues'
        response = HTTP.get("https://comicvine.gamespot.com/api/issues/?api_key=77adb7cc22c5f88e682b0d4bd106ce79571f9cde&filter=id:" + id + "&field_list=" + fieldlist + "&format=json")
      elsif resource_type == 'characters'
        response = HTTP.get("https://comicvine.gamespot.com/api/characters/?api_key=77adb7cc22c5f88e682b0d4bd106ce79571f9cde&filter=id:" + id + "&field_list=" + fieldlist + "&format=json")
      else
        response = HTTP.get("https://comicvine.gamespot.com/api/issues/?api_key=77adb7cc22c5f88e682b0d4bd106ce79571f9cde&filter=volume:" + id + "&field_list=" + fieldlist + "&format=json")
      end

      return response.to_s

    end

end
