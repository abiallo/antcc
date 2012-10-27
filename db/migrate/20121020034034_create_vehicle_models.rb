class CreateVehicleModels < ActiveRecord::Migration
  def self.up
    create_table :vehicle_models do |t|
      t.string :name
      t.string :vehicletype
      t.string :country
      t.string :image
      t.integer :observation
      t.integer :fireair
      t.integer :fireland
      t.integer :maxspeed
      t.integer :cruisespeed
      t.integer :crew
      t.string :function
      t.text :note

      t.timestamps
    end
  end

  def self.down
    drop_table :vehicle_models
  end
end
