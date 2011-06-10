module UsersHelper
  
  def validate_avatar_url url
    return url if url.present? and FileTest.exists? url
    "examples/user-big.jpg"
  end
  
end
