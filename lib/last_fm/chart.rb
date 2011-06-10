module LastFM

  class Chart < Request
    def self.getTopArtists limit = nil, page = nil
      RedisQueryable.look_up_key(:chart, { :type => :artists, :page => page }) do
        chart_request "getTopArtists", "artists", limit, page do |artists|
          artists = LastFM::Validator.validate_mash artists, "image"
          update_results [current_class_name, __method__], artists
          RedisQueryable.store :chart, { :type => :artists, :page => page }, artists.to_json
        end
      end
    end

    def self.getTopTracks limit = nil, page = nil
      RedisQueryable.look_up_key(:chart, { :type => :tracks, :page => page }) do
        chart_request "getTopTracks", "tracks", limit, page do |tracks|
          tracks = LastFM::Validator.validate_mash tracks
          update_results [current_class_name, __method__], tracks
          RedisQueryable.store :chart, { :type => :tracks, :page => page }, tracks.to_json
        end
      end
    end
    
  end

end