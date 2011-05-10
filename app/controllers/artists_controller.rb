require 'uri'

class ArtistsController < ApplicationController
  def show
    @artist = LastFM::Artist.getInfo CGI.unescape(params[:id])
    @tracks = LastFM::Artist.getTopTracks @artist.name, 10
    @images = LastFM::Artist.getImages @artist.name, 18
    @related= LastFM::Artist.getSimilar @artist.name, 6
    @albums = LastFM::Artist.getTopAlbums @artist.name, 8
    
    
  end

  def index
    @albums = LastFM::Artist.getTopAlbums "Avril Lavigne", 20
    puts @albums
  end

end
