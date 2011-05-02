require 'httparty'
require 'active_support'
require 'hashie'

class LastFMRequest
  include HTTParty
    
  base_uri "ws.audioscrobbler.com/2.0/"
  parser Proc.new { |data| Hashie::Mash.new(ActiveSupport::JSON.decode(data)) }
  default_params :format => 'json'
  debug_output $>
  format :json

  def self.api_key=(key)
    @@api_key = key
    default_params :api_key => key
  end
  
  def self.api_key
    @@api_key
  end
  
  def self.limit=(limit)
    @limit = limit
    default_params :limit => limit
  end
  
  def self.limit
    @limit
  end
  
  def self.page=(page)
    @page = page
    default_params :page => page
  end
  
  def self.page
    @page
  end
end
  