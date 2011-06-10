class Playlist < ActiveRecord::Base
  has_many :tracks, :through => :playlists_tracks
  belongs_to :user
end