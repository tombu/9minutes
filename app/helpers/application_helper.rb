module ApplicationHelper
  
  def validate_img_url image, size
    image.each do |img|
      if img["size"] == size.to_s
        if img["#text"].empty?
           return "/images/placeholder/artist.png"
        end
        return img["#text"]
      end
    end
        
  end
  
  def get_album_info album, artist
    @result = LastFM::Album.getInfo(album, artist)
    @result.album
  end
  
end
