require 'uri'

class ArtistsController < ApplicationController

  @@limit = { tracks: 10, albums: 4, similar: 6 }

  def show
    artist = CGI.unescape params[:id]
    
    @artist = LastFM::Artist.getInfo artist
    @tracks = LastFM::Artist.getTopTracks artist, @@limit[:tracks]
    @albums = LastFM::Artist.getTopAlbums artist, @@limit[:albums]
    @related= LastFM::Artist.getSimilar artist, @@limit[:similar]

    LastFM::Request.run_queue!
    
    render :partial=>"show", :locals=>{
      :artist=>@artist,
      :tracks=>@tracks,
      :albums=>@albums,
      :related=>@related
    }
  end
  
  
  def more_tracks
    prepare params
    @tracks = LastFM::Artist.getTopTracks params[:q], @@limit[:tracks], (params[:size] / @@limit[:tracks] + 1)
    LastFM::Request.run_queue!
   
    render :partial=>"more_tracks", :locals=>{:tracks=>@tracks}
  end
  
  def more_albums
    prepare params
    @albums = LastFM::Artist.getTopAlbums params[:q], @@limit[:albums], (params[:size] / @@limit[:albums] + 1)
    LastFM::Request.run_queue!

    render :partial=>"more_albums", :locals=>{:albums=>@albums}
  end

  def album_info
    @album = LastFM::Album.getInfo CGI.unescape(params[:album]), CGI.unescape(params[:id])
    LastFM::Request.run_queue!

    render :partial=>"album_info", :locals=>{:album=>@album}
  end
  
  def favourize
    puts params.inspect
    artist = CGI.unescape params[:id]
    @artist = LastFM::Artist.getInfo artist
    LastFM::Request.run_queue!
    @artist = Artist.new(:name => @artist.name, :img_url => validate_img_url(@artist.image, "artist", :extralarge))
    unless current_user.artists.include? @artist
      current_user.artists << @artist if @artist.save
    end
    render :nothing => true
  end
  
  private
  
  def prepare params
    params[:q] = CGI.unescape params[:q]
    params[:size] = params[:size].to_i
  end
end
