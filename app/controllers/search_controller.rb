class SearchController < ApplicationController
  def index
    if params[:q].nil?
      params[:q] = "foobar"
    end
    
    if !params[:q].nil?
      @artists = LastFM::Artist.search(params[:q].to_s.lstrip, 18)
      @tracks = LastFM::Track.search(params[:q].to_s.lstrip, 24)
      @albums = LastFM::Album.search(params[:q].to_s.lstrip, 16)
    end

  end

end