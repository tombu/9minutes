module LastFM
  
  class Album < LastFMRequest
    def self.search query, limit = nil, page = nil
      album_request "search", "albummatches", query, nil, limit, page do |result|
        result = LastFM::Validator.validate_mash result
        result = Hashie::Mash.new({ :album => [] }) if result.blank?
        update_results "#{current_class_name}_#{__method__}", result
      end
    end
  
    # return: album name, artist, (top)tags, tracks ( name, duration (in sec) ) mbid (album), release date, image urls ( different sizes )
    def self.getInfo album, artist
      album_request "getInfo", "album", album, artist
    end
  
    # return: tags ( name, tag´s last.fm-url ) ordered by popularity
    def self.getTopTags album, artist
      album_request "getTopTags", "toptags", album, artist
    end
  
  end

end