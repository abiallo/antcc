class CreateGeoscoisGeosmaps < ActiveRecord::Migration
  def self.up
    create_table :geoscois_geosmaps, :id => false do |t|
      t.references :geoscois
      t.references :geosmaps
    end
  end

  def self.down
    drop_table :geoscois_geosmaps
  end
end
