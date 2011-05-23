class HomeController < ApplicationController
  def index
    LastFM::Chart.getTopTracks 25
    LastFM::Chart.getTopArtists 10
    
    LastFM::LastFMRequest.run
    
    @artists = LastFM::LastFMRequest.results[0]
    @tracks = LastFM::LastFMRequest.results[1]
  end

end
