class Track < ActiveRecord::Base
  belongs_to :artist
  has_many :playlists, :through => :playlists_tracks
  
end
