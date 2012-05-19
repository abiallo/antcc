class CreateGeosmapsTracks < ActiveRecord::Migration
  def self.up
    create_table :geosmaps_tracks, :id => false do |t|
      t.references :geosmaps
      t.references :tracks
    end
  end

  def self.down
    drop_table :geosmaps_tracks
  end
end
