class CreateGeosmapsGeospolygons < ActiveRecord::Migration
  def self.up
    create_table :geosmaps_geospolygons, :id => false do |t|
      t.references :geosmap
      t.references :geospolygon
    end
  end

  def self.down
    drop_table :geosmaps_geospolygons
  end
end
