class CreateGeosmapsGeospolylines < ActiveRecord::Migration
  def self.up
    create_table :geosmaps_geospolylines, :id => false do |t|
      t.references :geosmap
      t.references :geospolyline
    end
  end

  def self.down
    drop_table :geosmaps_geospolylines
  end
end
