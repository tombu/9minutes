module LastFM
  
  class Track < Request
    def self.search query, limit = nil, page = nil
      track_request "search", "trackmatches", query, nil, limit, page do |result|
        result = LastFM::Validator.validate_mash result
        result = Hashie::Mash.new({ :track => [] }) if result.blank?
        update_results [current_class_name, __method__], result
      end
    end
  
    # return: track name, id, (top)tags, artist, duration (in msec), album ( artist, title, image urls ( different sizes) ), mbid
    def self.getInfo track, artist
      track_request "getInfo", nil, track, artist
    end
  
    # return: tracks ( name, artist (name, mbid), duration (in msec), image urls (sometimes) )
    def self.getSimilar track, artist, limit = nil
      track_request "getSimilar", "similartracks", track, artist, limit
    end
  
    # return: tags ( name, tag´s last.fm-url ) ordered by popularity
    def self.getTopTags track, artist
      track_request "getTopTags", "toptags", track, artist
    end
  end

end