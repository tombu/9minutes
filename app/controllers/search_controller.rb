class SearchController < ApplicationController
  def index

    if !params[:search_term].nil?
      puts "TRACK SEARCH"
      @results = LastFM::Artist.search(params[:search_term].to_s.lstrip)
      @resultsArtists = @results["results"]
      @results = LastFM::Track.search(params[:search_term].to_s.lstrip)
      @resultsTracks = @results["results"]
      @results = LastFM::Album.search(params[:search_term].to_s.lstrip)
      @resultsAlbums = @results["results"]
    end

  end

end