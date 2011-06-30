class TracksController < ApplicationController
  def index
  end

  def search_video
    puts params
    @video = @youtube_client.videos_by(:query => "#{CGI.unescape(params[:artist])} #{CGI.unescape(params[:track])} official", :page => 1, :per_page => 1, :order_by => "relevance")
    @id = @video.videos.first.unique_id
    
    render :partial=>"video_id", :locals=>{:id=>@id}
  end
end