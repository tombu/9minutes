module LastFM  

  class Artist < LastFMRequest
    def self.search query, limit = nil, page = nil
      artist_request "search", "artistmatches", query, limit, page
    end
    
    # return: artist name, tags, similar artists, artist bio (summary / long), mbid, image urls ( different sizes )
    def self.getInfo artist
      artist_request "getInfo", nil, artist
    end
    
    # return: artists ( name, mbid, image urls ( different sizes ) )
    def self.getSimilar artist, limit = nil
      artist_request "getSimilar", "similarartists", artist, limit
    end
    
    # return: tags ( name, tag´s last.fm-url ) ordered by popularity
    def self.getTopTags artist
      artist_request "getTopTags", "toptags", artist
    end
    
    # return: tracks ( name, image urls ( different sizes ) ) ordered by popularity
    def self.getTopTracks artist, limit = nil, page = nil
      artist_request "getTopTracks", "toptracks", artist, limit, page
    end
    
    # return: albums ( name, mbid, album url, image urls ( different sizes ) ) ordered by popularity
    def self.getTopAlbums artist, limit = nil, page = nil
      artist_request "getTopAlbums", "topalbums", artist, limit, page
    end
    
  end
  
  
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
  
  
  class Track < LastFMRequest
    def self.search query, limit = nil, page = nil
      track_request "search", "trackmatches", query, nil, limit, page
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