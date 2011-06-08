class CreateArtists < ActiveRecord::Migration
  def self.up
    create_table :artists do |t|
      t.string :name

      t.timestamps
    end
    
    create_table :artists_users, :id => false do |t|
      t.references :user
      t.references :artist
    end
  end

  def self.down
    drop_table :artists
    drop_table :artists_users
  end
  
end