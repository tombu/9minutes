module LastFM
  
  class Album < Request
    
    def self.search query, limit = nil, page = nil
      album_request "search", "albummatches", query, nil, limit, page do |result|
        result = LastFM::Validator.validate_mash result
        result = Hashie::Mash.new({ :album => [] }) if result.blank?
        update_results [current_class_name, __method__], result
      end
    end
  
    # return: album name, artist, (top)tags, tracks ( name, duration (in sec) ) mbid (album), release date, image urls ( different sizes )
    def self.getInfo album, artist
      RedisQueryable.look_up_key(:artist, { :hashable => [album, artist] }) do
        album_request "getInfo", "album", album, artist do |info|
          info = LastFM::Validator.validate_mash info, "tracks"
          info = Hashie::Mash.new({ :tracks => [] }) if info.blank?
          update_results [current_class_name, __method__], info
          RedisQueryable.store :artist, { :hashable => [album, artist] }, info.to_json
        end
      end
    end
  
    # return: tags ( name, tag´s last.fm-url ) ordered by popularity
    def self.getTopTags album, artist
      album_request "getTopTags", "toptags", album, artist
    end
  
  end

end