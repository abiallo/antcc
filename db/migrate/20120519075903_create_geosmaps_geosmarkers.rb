class CreateGeosmapsGeosmarkers < ActiveRecord::Migration
  def self.up
    create_table :geosmaps_geosmarkers, :id => false do |t|
      t.references :geosmaps
      t.references :geosmarkers
    end
  end

  def self.down
    drop_table :geosmaps_geosmarkers
  end
end
