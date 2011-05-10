class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter { |c| @youtube_client = YouTubeIt::Client.new(:dev_key=>"AI39si600H1fRQ6HW1pHG89e-23Uxf44YHu5TsCJMhNf5hFaYWSSSyyrOIEcOX451sFeh_OZdbbA48_g6OInfTv042-Id163tg") }
end
