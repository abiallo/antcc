class CreateGeoscirclesGeosmaps < ActiveRecord::Migration
  def self.up
    create_table :geoscircles_geosmaps, :id => false do |t|
      t.references :geoscircles
      t.references :geosmaps
    end
  end

  def self.down
    drop_table :geoscircles_geosmaps
  end
end
