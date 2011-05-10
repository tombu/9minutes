module LastFM
  class Chart < LastFMRequest
    def self.getTopArtists limit = nil, page = nil
      chart_request "getTopArtists", "artists", limit, page
    end
    
    def self.getTopTracks limit = nil, page = nil
      chart_request "getTopTracks", "tracks", limit, page
    end
  end

end