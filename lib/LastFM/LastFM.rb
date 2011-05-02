
module LastFM  

  class Artist < LastFMRequest
    def self.search artist
      get('/', :query => {:method => 'artist.search', :artist => artist})
    end
    
    # return: artist name, tags, similar artists, artist bio (summary / long), mbid, image urls ( different sizes )
    def self.getInfo artist = nil, mbid = nil, autocorrect = 1
      get('/', :query => {:method => 'artist.getInfo', :artist => artist, :mbid => mbid, :autocorrect => autocorrect})
    end
    
    # return: artists ( name, mbid, image urls ( different sizes ) )
    def self.getSimilar artist = nil, mbid = nil, autocorrect = 1
      get('/', :query => {:method => 'artist.getSimilar', :artist => artist, :mbid => mbid, :autocorrect => autocorrect})
    end
    
    # return: tags ( name, tag´s last.fm-url ) ordered by popularity
    def self.getTopTags artist = nil, mbid = nil, autocorrect = 1
      get('/', :query => {:method => 'artist.getTopTags', :artist => artist, :mbid => mbid, :autocorrect => autocorrect})
    end
    
    # return: tracks ( name, image urls ( different sizes ) ) ordered by popularity
    def self.getTopTracks artist = nil, mbid = nil, autocorrect = 1
      get('/', :query => {:method => 'artist.getTopTracks', :artist => artist, :mbid => mbid, :autocorrect => autocorrect})
    end
    
    # return: albums ( name, mbid, album url, image urls ( different sizes ) ) ordered by popularity
    def self.getTopAlbums artist = nil, mbid = nil, autocorrect = 1
      get('/', :query => {:method => 'artist.getTopAlbums', :artist => artist, :mbid => mbid, :autocorrect => autocorrect})
    end
    
  end
  
  
  class Album < LastFMRequest
    def self.search album
      get('/', :query => {:method => 'album.search', :album => album})
    end
    
    # return: album name, artist, (top)tags, tracks ( name, duration (in sec) ) mbid (album), release date, image urls ( different sizes )
    def self.getInfo album = nil, artist = nil, mbid = nil, autocorrect = 1
      get('/', :query => {:method => 'album.getInfo', :album =>album, :artist => artist, :mbid => mbid, :autocorrect => autocorrect})
    end
    
    # return: tags ( name, tag´s last.fm-url ) ordered by popularity
    def self.getTopTags album = nil, artist = nil, mbid = nil, autocorrect = 1
      get('/', :query => {:method => 'album.getTopTags', :album =>album, :artist => artist, :mbid => mbid, :autocorrect => autocorrect})
    end
    
  end
  
  
  class Track < LastFMRequest
    def self.search track
      get('/', :query => {:method => 'track.search', :track => track})
    end
    
    # return: track name, id, (top)tags, artist, duration (in msec), album ( artist, title, image urls ( different sizes) ), mbid
    def self.getInfo track = nil, artist = nil, autocorrect = 1
      get('/', :query => {:method => 'track.getInfo', :track => track, :artist => artist, :autocorrect => autocorrect})
    end
    
    # return: tracks ( name, artist (name, mbid), duration (in msec), image urls (sometimes) )
    def self.getSimilar track = nil, artist = nil, autocorrect = 1
      get('/', :query => {:method => 'track.getSimilar', :track => track, :artist => artist, :autocorrect => autocorrect})
    end
    
    # return: tags ( name, tag´s last.fm-url ) ordered by popularity
    def self.getTopTags track = nil, artist = nil, autocorrect = 1
      get('/', :query => {:method => 'track.getTopTags', :track => track, :artist => artist, :autocorrect => autocorrect})
    end
  end
  
end