class PlaylistsTracks < ActiveRecord::Base
  belongs_to :playlist
  belongs_to :track
end
