class AddSizeToTracks < ActiveRecord::Migration
  def self.up
        add_column :tracks, :size, :string
  end

  def self.down
        remove_column :tracks, :size
  end
end
