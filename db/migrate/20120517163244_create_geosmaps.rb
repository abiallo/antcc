class CreateGeosmaps < ActiveRecord::Migration
  def self.up
    create_table :geosmaps do |t|
      t.float :centerlat
      t.float :centerlng
      t.string :name
      t.integer :zoom
      t.string :maptype
      t.boolean :milflag
      t.integer :user_id
      t.text :note
      t.timestamps
    end
  end

  def self.down
    drop_table :geosmaps
  end
end
