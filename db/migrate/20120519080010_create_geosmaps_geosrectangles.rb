class CreateGeosmapsGeosrectangles < ActiveRecord::Migration
  def self.up
    create_table :geosmaps_geosrectangles, :id => false do |t|
      t.references :geosmaps
      t.references :geosrectangles
    end
  end

  def self.down
    drop_table :geosmaps_geosrectangles
  end
end
