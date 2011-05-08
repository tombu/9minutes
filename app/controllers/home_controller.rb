class HomeController < ApplicationController
  def index
    @tracks = LastFM::Chart.getTopTracks 25
    @artists = LastFM::Chart.getTopArtists 10
  end

end
