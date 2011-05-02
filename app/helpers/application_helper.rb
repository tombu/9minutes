module ApplicationHelper
  
  def validate_img_url image, size

    if image.nil?
      "noImage"
    else
      image.each do |img|
        if img["size"] == size.to_s
          return img["#text"]
        end
      end
    end
        
  end
  
  def get_album_info album, artist
    @result = LastFM::Album.getInfo(album, artist)
    @result.album
  end
  
end
