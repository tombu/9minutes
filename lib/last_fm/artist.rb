module LastFM
  
  class Artist < LastFMRequest
    
    def self.search query, limit = nil, page = nil
      artist_request "search", "artistmatches", query, limit, page do |result|
        result = LastFM::Validator.validate_mash result
        result = Hashie::Mash.new({ :artist => [] }) if result.blank?
        update_results "#{current_class_name}_#{__method__}", result
      end
    end
  
    # return: artist name, tags, similar artists, artist bio (summary / long), mbid, image urls ( different sizes )
    def self.getInfo artist
      artist_request "getInfo", "artist", artist do |info|
        LastFM::Validator.validate_mash info, "tag", "image"
      end
    end
  
    # return: artists ( name, mbid, image urls ( different sizes ) )
    def self.getSimilar artist, limit = nil, page = nil
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
      artist_request "getTopAlbums", "topalbums", artist, limit, page do |albums|
        albums = LastFM::Validator.validate_mash albums, "album"
        albums = Hashie::Mash.new({ :album => [] }) if albums.total == "0"
        update_results "#{current_class_name}_#{__method__}", albums
      end
    end
    
    def self.getImages artist, limit = nil
      artist_request "getImages", "images", artist, limit do |images|
        images = LastFM::Validator.validate_mash images, "image"
        images = Hashie::Mash.new({ :image => [] }) if images.total == "0"
        update_results "#{current_class_name}_#{__method__}", images
      end
    end
  
  end

end