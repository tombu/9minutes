class Playlist < ActiveRecord::Base
  has_many :tracks, :through => :playlists_tracks
end