class CreateGeoscirclesGeosmaps < ActiveRecord::Migration
  def self.up
    create_table :geoscircles_geosmaps, :id => false do |t|
      t.references :geoscircle
      t.references :geosmap
    end
  end

  def self.down
    drop_table :geoscircles_geosmaps
  end
end
