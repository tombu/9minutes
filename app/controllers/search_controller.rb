class SearchController < ApplicationController

  @@limit = { artists: 5, tracks: 10, albums: 5 }

  def show
    @q = params[:id].to_s.lstrip
    
    @artists = LastFM::Artist.search @q, @@limit[:artists]
    @tracks = LastFM::Track.search @q, @@limit[:tracks]
    @albums = LastFM::Album.search @q, @@limit[:albums]
      
    LastFM::LastFMRequest.run_queue!
    
    render :partial=>"show", :locals=>{
      :artist=>@artist,
      :tracks=>@tracks,
      :albums=>@albums
    }
  end
  
  def autocomplete
    q = params[:q].to_s.lstrip

    @artists = $sevendigital_client.artist.search q, { :pagesize=>5 }

    render :partial=>"autocomplete", :locals=>{ :artists=>@artists }
  end
  
  def more_artists
    @artists = LastFM::Artist.search params[:q].to_s.lstrip, @@limit[:artists], (params[:size].to_i / @@limit[:artists] + 1)
    LastFM::LastFMRequest.run_queue!

    render :partial=>"more_artists", :locals=>{:artists=>@artists}
  end
end