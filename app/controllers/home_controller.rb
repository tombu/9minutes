class HomeController < ApplicationController
  def show
    @charts = LastFM::Chart.getTopArtists 10
    LastFM::LastFMRequest.run_queue!

    render :partial=>"index"
  end

end
