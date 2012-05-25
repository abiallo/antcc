class CreateGeosmapsUsers < ActiveRecord::Migration
  def self.up
    create_table :geosmaps_users, :id => false do |t|
      t.references :geosmap
      t.references :user
    end
  end

  def self.down
    drop_table :geosmaps_users
  end
end
