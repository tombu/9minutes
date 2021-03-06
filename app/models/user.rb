class User < ActiveRecord::Base
  has_and_belongs_to_many :artists
  has_many :playlist

  # :token_authenticatable, :encryptable, :confirmable, :lockable, :recoverable, :timeoutable
  devise :database_authenticatable, :registerable, :omniauthable,
         :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :username, :email, :password, :password_confirmation, :remember_me
  has_attached_file :avatar, 
      :styles => { 
        :original => "200x200#",
        :thumb => "60x60#"
      },
      :url => "/media/avatars/:style/:id_:filename",
      :path => ":rails_root/public/media/avatars/:style/:id_:filename"
 
  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["user_hash"]
        user.email = data["email"]
      end
    end
  end
  
  def self.find_for_facebook_oauth(access_token, signed_in_resource=nil)
    data = access_token['extra']['user_hash']
    if user = User.find_by_email(data["email"])
      user
    else # Create a user with a stub password. 
      User.create!(:email => data["email"], :password => Devise.friendly_token[0,20]) 
    end
  end
  
  def self.find_for_open_id(access_token, signed_in_resource=nil)
    data = access_token['user_info']
    if user = User.find_by_email(data["email"])
      user
    else # Create a user with a stub password.
      User.create!(:email => data["email"], :password => Devise.friendly_token[0,20])
    end
  end
  
end