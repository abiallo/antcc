class CreateGeosmapsUsers < ActiveRecord::Migration
  def self.up
    create_table :geosmaps_users, :id => false do |t|
      t.references :geosmaps
      t.references :users
    end
  end

  def self.down
    drop_table :geosmaps_users
  end
end
