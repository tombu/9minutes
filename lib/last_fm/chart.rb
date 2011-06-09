module LastFM

  class Chart < Request
    def self.getTopArtists limit = nil, page = nil
      chart_request "getTopArtists", "artists", limit, page do |artists|
        LastFM::Validator.validate_mash artists, "image"
        update_results [current_class_name, __method__], artists
      end
    end

    def self.getTopTracks limit = nil, page = nil
      chart_request "getTopTracks", "tracks", limit, page do |tracks|
        LastFM::Validator.validate_mash tracks
        update_results [current_class_name, __method__], tracks
      end
    end
  end

end