class CreateGeosmapsGeospolylines < ActiveRecord::Migration
  def self.up
    create_table :geosmaps_geospolylines, :id => false do |t|
      t.references :geosmaps
      t.references :geospolylines
    end
  end

  def self.down
    drop_table :geosmaps_geospolylines
  end
end
