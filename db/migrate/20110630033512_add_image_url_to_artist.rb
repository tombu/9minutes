class AddImageUrlToArtist < ActiveRecord::Migration
  def self.up
    add_column :artists, :img_url,    :string    
  end

  def self.down
    remove_column :artists, :img_url    
  end
end
