class CreateShipClasses < ActiveRecord::Migration
  def self.up
    create_table :ship_classes do |t|
      t.string :name
      t.string :shiptype
      t.string :country
      t.string :image
      t.integer :observationair
      t.integer :observationsurf
      t.integer :observationunders
      t.integer :fireair
      t.integer :fireland
      t.integer :firesurf
      t.integer :fireunder
      t.integer :maxspeed
      t.integer :cruisespeed
      t.integer :crew
      t.string :function
      t.text :note

      t.timestamps
    end
  end

  def self.down
    drop_table :ship_classes
  end
end
