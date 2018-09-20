class Character

  # ==================================================
  #                     CHARACTER ROUTES
  # ==================================================

    # add attribute readers for instance access
    attr_reader :id, :name, :deck, :icon_url, :real_name, :resource_type, :publisher, :gender

    # connect to postgres
    # DB = PG.connect({:host => "localhost", :port => 5432, :dbname => 'searchstack_development'})
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
        @gender = opts["gender"].to_i
        @real_name = opts["real_name"]
        @resource_type = opts["resource_type"]
        @publisher = opts["publisher"]
        @deck = opts["deck"]
        @icon_url = opts["icon_url"]
    end

    # ADD CHARACTER TO DB FOR USERS FAVORITES
    def self.create(thisChar)
      #Check to see if character already exists in db
      existResult = DB.exec(
          <<-SQL
          SELECT * FROM characters WHERE id = #{thisChar["id"]};
          SQL
      )
      #If character doesnt exist in db, save
      if existResult.first == nil
        p "character does not exist adding now"
        results = DB.exec(
        <<-SQL
        INSERT INTO characters(id, name, deck, publisher, gender, icon_url, real_name, resource_type ) VALUES (
                   #{thisChar["id"]},
                  '#{thisChar["name"]}',
                  '#{thisChar["deck"] ? thisChar["deck"] : "NULL"}',
                  '#{thisChar["publisher"]}',
                   #{thisChar["gender"]},
                  '#{thisChar["icon_url"] ?  thisChar["icon_url"] : "NULL"}',
                  '#{thisChar["real_name"]}',
                  '#{thisChar["resource_type"]}' )
            RETURNING id, name, deck, publisher, gender, icon_url, real_name, resource_type;
            SQL
        )
        # Return newly saved character
        newChar = results.first
        return Character.new(newChar)
      else
        # Return character that was already saved to db
        p "character exists here it is"
        return Character.new(existResult.first)
      end
    end
end
