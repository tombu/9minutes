require 'uri'

class ArtistsController < ApplicationController
  def show
    @artist = LastFM::Artist.getInfo CGI.unescape(params[:id])
    @tracks = LastFM::Artist.getTopTracks @artist.name, 10
    @albums = LastFM::Artist.getTopAlbums @artist.name, 8
  end

  def index
  end

end
