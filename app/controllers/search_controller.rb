class SearchController < ApplicationController
  def index
    puts "TRACK SEARCH"
    @results = LastFM::Track.search("one time")
    @resultsTracks = @results["results"]
    
    # puts "ARTIST INFO"    
    # @results = LastFM::Artist.getInfo("Justin Bieber")
  end

end