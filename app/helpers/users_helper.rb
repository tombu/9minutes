module UsersHelper
   
  def validate_avatar user, size = :original
    return user.avatar.url(size) if user.avatar?
    "examples/user-big.jpg"
  end
  
end
