require 'uri'

class ArtistsController < ApplicationController

  @@limit = { tracks: 10, albums: 4, similar: 6 }

  def show
    artist = CGI.unescape params[:artist]
    
    @artist = LastFM::Artist.getInfo artist
    @tracks = LastFM::Artist.getTopTracks artist, @@limit[:tracks]
    @albums = LastFM::Artist.getTopAlbums artist, @@limit[:albums]
    @related= LastFM::Artist.getSimilar artist, @@limit[:similar]

    LastFM::LastFMRequest.run_queue!
    
    render :partial=>"show", :locals=>{
      :artist=>@artist,
      :tracks=>@tracks,
      :albums=>@albums,
      :related=>@related
    }
  end
  
  def index
    redirect_to :root
  end
  
  
  def more_tracks
    more params
    @tracks = LastFM::Artist.getTopTracks params[:artist], @@limit[:tracks], (params[:size] / @@limit[:tracks] + 1)
    LastFM::LastFMRequest.run_queue!
   
    render :partial=>"more_tracks", :locals=>{:tracks=>@tracks}
  end
  
  def more_albums
    more params
    @albums = LastFM::Artist.getTopAlbums params[:artist], @@limit[:albums], (params[:size] / @@limit[:albums] + 1)
    LastFM::LastFMRequest.run_queue!

    render :partial=>"more_albums", :locals=>{:albums=>@albums}
  end
  
  def more params
    params[:artist] = CGI.unescape params[:artist]
    params[:size] = params[:size].to_i

    params
  end
end
