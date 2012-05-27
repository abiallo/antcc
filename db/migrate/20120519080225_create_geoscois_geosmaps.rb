class CreateGeoscoisGeosmaps < ActiveRecord::Migration
  def self.up
    create_table :geoscois_geosmaps, :id => false do |t|
      t.references :geoscoi
      t.references :geosmap
    end
  end

  def self.down
    drop_table :geoscois_geosmaps
  end
end
