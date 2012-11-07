class AddCountryToTracks < ActiveRecord::Migration
  def self.up
    add_column :tracks, :country, :string
  end

  def self.down
    remove_column :tracks, :country
  end
end
