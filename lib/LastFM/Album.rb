module LastFM
  
  class Album < LastFMRequest
    def self.search query, limit = nil, page = nil
      album_request "search", "albummatches", query, nil, limit, page
    end
  
    # return: album name, artist, (top)tags, tracks ( name, duration (in sec) ) mbid (album), release date, image urls ( different sizes )
    def self.getInfo album, artist
      album_request "getInfo", nil, album, artist
    end
  
    # return: tags ( name, tag´s last.fm-url ) ordered by popularity
    def self.getTopTags album, artist
      album_request "getTopTags", "toptags", album, artist
    end
  
  end

end