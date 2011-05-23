require 'httparty'
require 'json'
require 'hashie'

module LastFM

  class LastFMRequest
    include HTTParty
    
    base_uri 'http://ws.audioscrobbler.com/2.0//'
    parser Proc.new { |data| Hashie::Mash.new(JSON.parse(data)) }
    @@hydra = Typhoeus::Hydra.new
    default_params :format => 'json', :autocorrect => '1'
    #debug_output $>
    format :json
    @@results = Array.new()
    
    def self.api_key=(key)
      @@api_key = key
      default_params :api_key => key
    end

    def self.results
      return @@results
    end
    
    def self.run
      puts "<< ----------- hydra run ----------"
      @@hydra.run
      puts "<< ----------- hydra finished ----------"
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
    
    def self.chart_request method, node, limit = nil, page = nil
      request = Typhoeus::Request.new(base_uri, :params => default_params.merge(:method => "chart.#{method.to_s}", :limit => limit, :page => page))
      
      puts '----------------------'
      puts request.url
      puts '----------------------'
      
      request.on_complete do |response|
        if response.success?
          puts "---- '#{method.to_s}' -- TIME: #{response.time.to_s} ----"
          
          hash = Hashie::Mash.new(JSON.parse(response.body)) 
          hash = method.to_s == "search" ? hash.results.send(node.to_sym) : hash.send(node.to_sym)
          @@results.push(hash)
        elsif response.timed_out?
          puts ">> -- '#{method.to_s}' -- TIMED OUT -- <<"
        end
      end

      puts "---- '#{method.to_s}' request is queued ----" if @@hydra.queue request
    end

    private
    
    def self.handle_response method, node, request
      puts '----------------------'
      puts request.url
      puts '----------------------'
      request.on_complete do |response|
        if response.success?
          puts "---- '#{method.to_s}' -- TIME: #{response.time.to_s} ----"
          
          hash = Hashie::Mash.new(JSON.parse(response.body)) 
          method.to_s == "search" ? hash.results.send(node.to_sym) : hash.send(node.to_sym)
          puts hash
        elsif response.timed_out?
          puts ">> -- '#{method.to_s}' -- TIMED OUT -- <<"
        end
      end
    end
    
    def self.prepare_result method, node, response_hash
      method.to_s == "search" ? hash.results.send(node.to_sym) : hash.send(node.to_sym)
    end

  end

end