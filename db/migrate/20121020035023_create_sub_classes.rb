class CreateSubClasses < ActiveRecord::Migration
  def self.up
    create_table :sub_classes do |t|
      t.string :name
      t.string :type
      t.string :country
      t.string :image
      t.integer :observationair
      t.integer :observationsurf
      t.integer :observationunder
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
    drop_table :sub_classes
  end
end
