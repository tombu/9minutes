module LastFM
  
  class Artist < LastFMRequest
    def self.search query, limit = nil, page = nil
      artist_request "search", "artistmatches", query, limit, page
    end
  
    # return: artist name, tags, similar artists, artist bio (summary / long), mbid, image urls ( different sizes )
    def self.getInfo artist
      artist_request "getInfo", "artist", artist
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
      @albums = artist_request "getTopAlbums", "topalbums", artist, limit, page
      if @albums["@attr"].total.to_i == 1
        @albums.album = [@albums.album] # wrap with Array
      end
      @albums
    end
    
    def self.getImages artist, limit = nil
      artist_request "getImages", "images", artist, limit
    end
  
  end

end