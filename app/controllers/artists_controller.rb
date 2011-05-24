require 'uri'

class ArtistsController < ApplicationController

  def show
    @artist = LastFM::Artist.getInfo CGI.unescape(params[:id])
    @tracks = LastFM::Artist.getTopTracks CGI.unescape(params[:id]), 10
    @albums = LastFM::Artist.getTopAlbums CGI.unescape(params[:id]), 8
    @images = LastFM::Artist.getImages CGI.unescape(params[:id]), 18
    @related= LastFM::Artist.getSimilar CGI.unescape(params[:id]), 6

    LastFM::LastFMRequest.run_queue!
  end

end
