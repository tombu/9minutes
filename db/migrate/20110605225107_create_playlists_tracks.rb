class CreatePlaylistsTracks < ActiveRecord::Migration
  def self.up
    create_table :playlists_tracks do |t|
      t.references :playlist
      t.references :track
      t.string :youtube_id
      t.integer :position

      t.timestamps
    end
  end

  def self.down
    drop_table :playlists_tracks
  end
end
