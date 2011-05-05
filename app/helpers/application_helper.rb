# encoding: UTF-8
module ApplicationHelper
  
  def validate_img_url image, type, size
    @attr = (type=="gallery") ? "name" : "size"
    image.each do |img|
      if img[@attr] == size.to_s
        if img["#text"].empty?
          return "/images/placeholder/#{type.to_s}.png"
        end
        return img["#text"]
      end
    end
        
  end
  
  def get_album_info album, artist
    @result = LastFM::Album.getInfo(album, artist)
    @result.album
  end

  def trimString str, length
    truncate str, :length => length.to_i, :omission => "…"
  end
  
end