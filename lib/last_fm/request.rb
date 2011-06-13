require 'json'
require 'hashie'

module LastFM

  class Request

    @@base_uri = 'http://ws.audioscrobbler.com/2.0/'
    @@default_params = { :format => 'json', :autocorrect => '1' }
    @@hydra = Typhoeus::Hydra.new
    @@results = {}

    def self.api_key=(key)
      @@api_key = key
      @@default_params[:api_key] = key
    end

    def self.base_uri
      @@base_uri
    end

    def self.default_params
      @@default_params
    end

    def self.results keys = nil
      return @@results if keys.nil?
      @@results[("#{keys[0]}_#{keys[1]}".to_sym)]
    end

    def self.run_queue!
      puts "=> lastfm: Started request queue"
      @@hydra.run
      puts "=> lastfm: Queue finished"
    end

    def self.artist_request method, node, q, limit = nil, page = nil, &block
      request_params = default_params.merge( :method => "#{current_class_name}.#{method}", :artist => q, :limit => limit, :page => page )
      create_and_queue_request method, node, block, request_params
    end

    def self.album_request method, node, q, artist = nil, limit = nil, page = nil, &block
      request_params = default_params.merge( :method => "#{current_class_name}.#{method}", :album => q, :artist => artist, :limit => limit, :page => page )
      create_and_queue_request method, node, block, request_params
    end

    def self.track_request method, node, q, artist = nil, limit = nil, page = nil, &block
      request_params = default_params.merge( :method => "#{current_class_name}.#{method}", :track => q, :artist => artist, :limit => limit, :page => page )
      create_and_queue_request method, node, block, request_params
    end

    def self.chart_request method, node, limit = nil, page = nil, &block
      request_params = default_params.merge( :method => "#{current_class_name}.#{method}", :limit => limit, :page => page )
      create_and_queue_request method, node, block, request_params
    end

    protected

    def self.update_results keys, hash
      @@results[("#{keys[0]}_#{keys[1]}".to_sym)].update hash
    end

    def self.current_class_name
      self.name.split('::').last.downcase!
    end

    private

    def self.create_and_queue_request method, node, block, request_params
      request = Typhoeus::Request.new(base_uri, :params => request_params) # :timeout => APP_CONFIG["request_timeout"],
      handle_response request, method, node, block

      #puts "=> lastfm: '#{current_class_name}.#{method}' request is queued" if @@hydra.queue request
      @@results["#{current_class_name}_#{method}".to_sym] = Hashie::Mash.new
    end

    def self.handle_response request, method, node, block
      request.on_complete do |response|
        if response.success?
          puts "=> lastfm: '#{current_class_name}.#{method}' (#{response.time}s)"
          
          hash = Hashie::Mash.new(JSON.parse(response.body))
          hash = method.to_s == "search" ? hash.results.send(node.to_sym) : hash.send(node.to_sym)
          
          update_results [current_class_name, method], hash if hash.present? and block.nil?
          block.call( hash ) unless block.nil?
          
        elsif response.timed_out?
          puts "=> lastfm: '#{current_class_name}.#{method}' timed out"
        end
      end
    end

  end

end