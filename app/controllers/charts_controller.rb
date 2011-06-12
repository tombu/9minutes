class ChartsController < ApplicationController
  
  def index
    @charts = LastFM::Chart.getTopArtists 20
    LastFM::Request.run_queue!

    render :partial=>"index"
  end
  
  
  def more
    params[:size] = params[:size].to_i
    
    @charts = LastFM::Chart.getTopArtists 20, (params[:size] / 20 + 1)
    LastFM::Request.run_queue!

    render :partial=>"more_charts", :locals=>{:charts=>@charts}
  end

end
