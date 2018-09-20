class Issue

  # ==================================================
  #                     ISSUE ROUTES
  # ==================================================

    # add attribute readers for instance access
    attr_reader :id, :name, :description, :issue_number, :icon_url, :volume_id, :resource_type, :volume_name

    # connect to postgres
    #DB = PG.connect({:host => "localhost", :port => 5432, :dbname => 'searchstack_development'})
    if(ENV['DATABASE_URL'])
      uri = URI.parse(ENV['DATABASE_URL'])
      DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
      DB = PG.connect(host: "localhost", port: 5432, dbname: 'searchstack_development')
    end


    # initialize options hash
    def initialize(opts = {})
        @id = opts["id"].to_i
        @name = opts["name"]
        @issue_number = opts["issue_number"].to_i
        @icon_url = opts["icon_url"]
        @resource_type = opts["resource_type"]
        @description = opts["description"]
        @volume_id = opts["volume_id"].to_i
        @volume_name = opts["volume_name"]
    end

    # ADD ISSUE TO DB FOR OWNED USER ISSUE
    def self.create(thisIssue)
      #Check to see if issue already exists in db
      existResult = DB.exec(
          <<-SQL
          SELECT * FROM issues WHERE id = #{thisIssue["id"]};
          SQL
      )
      #If issue doesnt exist in db, save
      if existResult.first == nil
        p "issue does not exist adding now"
        results = DB.exec(
        <<-SQL
        INSERT INTO issues(id, name, description, issue_number, icon_url, volume_name, volume_id, resource_type ) VALUES (
                   #{thisIssue["id"]},
                  '#{thisIssue["name"]}',
                  '#{thisIssue["description"] ? thisIssue["description"] : "NULL"}',
                   #{thisIssue["issue_number"]},
                  '#{thisIssue["icon_url"] ?  thisIssue["icon_url"] : "NULL"}',
                  '#{thisIssue["volume_name"]}',
                   #{thisIssue["volume_id"]},
                  '#{thisIssue["resource_type"]}' )
            RETURNING id, name, description, issue_number, icon_url, volume_name, volume_id, resource_type;
            SQL
        )
        # Return newly saved issue
        newIssue = results.first
        return Issue.new(newIssue)
      else
        # Return issue that was already saved to db
        p "issue exists here it is"
        return Issue.new(existResult.first)
      end
    end
end
