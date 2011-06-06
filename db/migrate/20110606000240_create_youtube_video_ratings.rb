class CreateYoutubeVideoRatings < ActiveRecord::Migration
  def self.up
    create_table :youtube_video_ratings do |t|
      t.string :search_query
      t.string :video_id
      t.integer :rating, :default => 0

      t.timestamps
    end
  end

  def self.down
    drop_table :youtube_video_ratings
  end
end
