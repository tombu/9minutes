class ApplicationController < ActionController::Base
  protect_from_forgery
  
  # create the youtube client to access the API
  before_filter { |c| 
    @youtube_client = YouTubeIt::Client.new(
      :dev_key=>"AI39si600H1fRQ6HW1pHG89e-23Uxf44YHu5TsCJMhNf5hFaYWSSSyyrOIEcOX451sFeh_OZdbbA48_g6OInfTv042-Id163tg"
    ) 
  }
  
  
  # REMOTE CALL HELPER
  # for accessing/modifying ajax links
  
  def render_remote view
    if params[:remote] == "true"
      render view, :layout=>false
    else
      render :nothing=>true, :layout=>true
    end
  end

  def async_redirect_to path
    redirect_to "/#!" + path
  end

  def async_link_to body, path, html_options = {}
    link_to body, "/#!" + path, html_options
  end
  
end