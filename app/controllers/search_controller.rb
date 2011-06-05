class SearchController < ApplicationController

  def index
    redirect_to home_index_path if params[:q].blank?
    
    @artists = LastFM::Artist.search(params[:q].to_s.lstrip, 8)
    @tracks = LastFM::Track.search(params[:q].to_s.lstrip, 24)
    @albums = LastFM::Album.search(params[:q].to_s.lstrip, 16)
      
    LastFM::LastFMRequest.run_queue!
  end

end