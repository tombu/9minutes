require 'httparty'
require 'active_support'
require 'hashie'

module LastFM

  class LastFMRequest
    include HTTParty
  
    base_uri "ws.audioscrobbler.com/2.0/"
    parser Proc.new { |data| Hashie::Mash.new(ActiveSupport::JSON.decode(data)) }
    default_params :format => 'json', :autocorrect => '1'
    debug_output $>
    format :json

    def self.api_key=(key)
      @@api_key = key
      default_params :api_key => key
    end

    def self.limit=(limit)
      @limit = limit
    end

    def self.limit
      @limit
    end

    def self.page=(page)
      @page = page
    end

    def self.page
      @page
    end

    def self.artist_request method, node, q, limit = nil, page = nil
      prepare_result method, node, get('/', :query => { :method => "artist.#{method.to_s}", :artist => q, :limit => limit, :page => page })
    end

    def self.album_request method, node, q, artist = nil, limit = nil, page = nil
      prepare_result method, node, get('/', :query => { :method => "album.#{method.to_s}", :album => q, :artist => artist, :limit => limit, :page => page })
    end

    def self.track_request method, node, q, artist = nil, limit = nil, page = nil
      prepare_result method, node, get('/', :query => { :method => "track.#{method.to_s}", :track => q, :artist => artist, :limit => limit, :page => page })
    end

    private

    def self.prepare_result method, node, response_hash
      if method.to_s == "search"
        response_hash = response_hash.results
      end
      response_hash.send(node.to_sym)
    end

  end

end