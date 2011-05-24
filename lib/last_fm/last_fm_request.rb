require 'json'
require 'hashie'

module LastFM

  class LastFMRequest
    
    @@base_uri = 'http://ws.audioscrobbler.com/2.0/'
    @@default_params = { :format => 'json', :autocorrect => '1' }
    @@hydra = Typhoeus::Hydra.new
    @@results = {}
    
    def self.api_key=(key)
      @@api_key = key
      @@default_params[:api_key] = key
    end

    def self.base_uri
      return @@base_uri
    end
    
    def self.default_params
      return @@default_params
    end
    
    def self.results
      return @@results
    end
  
    def self.run_queue!
      puts "<< ----------- started request queue ---------"
      @@hydra.run
      puts "<< -------------- queue finished -------------"
    end

    def self.artist_request method, node, q, limit = nil, page = nil, &block
      klass_name = self.name.split('::').last.downcase!
      request_params = default_params.merge( :method => "#{klass_name}.#{method.to_s}", :artist => q, :limit => limit, :page => page )
      create_and_queue_request klass_name, method, node, block, request_params
    end

    def self.album_request method, node, q, artist = nil, limit = nil, page = nil, &block
      klass_name = self.name.split('::').last.downcase!
      request_params = default_params.merge( :method => "#{klass_name}.#{method.to_s}", :album => q, :artist => artist, :limit => limit, :page => page )
      create_and_queue_request klass_name, method, node, block, request_params
    end

    def self.track_request method, node, q, artist = nil, limit = nil, page = nil, &block
      klass_name = self.name.split('::').last.downcase!
      request_params = default_params.merge( :method => "#{klass_name}.#{method.to_s}", :track => q, :artist => artist, :limit => limit, :page => page )
      create_and_queue_request klass_name, method, node, block, request_params
    end
    
    def self.chart_request method, node, limit = nil, page = nil, &block
      klass_name = self.name.split('::').last.downcase!
      request_params = default_params.merge( :method => "#{klass_name}.#{method.to_s}", :limit => limit, :page => page )
      create_and_queue_request klass_name, method, node, block, request_params
    end

    private
    
    def self.create_and_queue_request klass_name, method, node, block, request_params
      request = Typhoeus::Request.new(base_uri, :params => request_params)
      handle_response request, klass_name, method, node, block
      
      puts ">> ---- '#{klass_name}.#{method.to_s}' request is queued ----" if @@hydra.queue request
      @@results[(klass_name + "_" + method).to_sym] = Hashie::Mash.new
    end
    
    def self.handle_response request, klass_name, method, node, block
      request.on_complete do |response|
        if response.success?
          puts "<< ---- '#{klass_name}.#{method.to_s}' -- TIME: #{response.time.to_s} ----"
          
          hash = Hashie::Mash.new(JSON.parse(response.body)) 
          hash = method.to_s == "search" ? hash.results.send(node.to_sym) : hash.send(node.to_sym)
          
          @@results[(klass_name + "_" + method).to_sym].update hash
          
          block.call(@@results[(klass_name + "_" + method).to_sym]) unless block.nil?
        elsif response.timed_out?
          puts ">> -- '#{klass_name}.#{method.to_s}' -- TIMED OUT -- <<"
        end
      end
    end

  end

end