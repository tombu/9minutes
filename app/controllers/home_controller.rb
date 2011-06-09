class HomeController < ApplicationController

  def show
    @charts = LastFM::Chart.getTopArtists 10
    LastFM::Request.run_queue!

    render :partial=>"index"
  end

end
