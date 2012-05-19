class CreateGeosmapsGeospolygons < ActiveRecord::Migration
  def self.up
    create_table :geosmaps_geospolygons, :id => false do |t|
      t.references :geosmaps
      t.references :geospolygons
    end
  end

  def self.down
    drop_table :geosmaps_geospolygons
  end
end
