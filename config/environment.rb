# Load the rails application
require File.expand_path('../application', __FILE__)
require "#{Rails.root.to_s}/lib/LastFM/LastFMRequest.rb"
require "#{Rails.root.to_s}/lib/LastFM/LastFM.rb"

# Initialize the rails application
Nineminutes::Application.initialize!

LastFMRequest::api_key = '4c32e360f68553ec8fdca3711456b4f9'
