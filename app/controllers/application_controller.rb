class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter { |c| @youtube_client = YouTubeIt::Client.new(:dev_key=>"AI39si600H1fRQ6HW1pHG89e-23Uxf44YHu5TsCJMhNf5hFaYWSSSyyrOIEcOX451sFeh_OZdbbA48_g6OInfTv042-Id163tg") }
  
  def async_redirect_to path
    redirect_to "/#!" + path
  end
  
  def validate_img_url image, type, size
    @attr = (type=="gallery") ? "name" : "size"
    image.each do |img|
      if img[@attr] == size.to_s
        if img["#text"].blank?
          return "/images/placeholder/#{type.to_s}.png"
        end
        return img["#text"]
      end
    end
        
  end
  
end