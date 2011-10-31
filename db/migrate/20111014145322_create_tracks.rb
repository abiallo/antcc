class CreateTracks < ActiveRecord::Migration
  def self.up
    create_table :tracks do |t|
      t.float :lat
      t.float :long
      t.string :cstId
      t.string :cstName
      t.string :icon
      t.string :category
      t.decimal :course
      t.decimal :speed
      t.datetime :postime
      t.timestamps
    end
  end

  def self.down
    drop_table :tracks
  end
end
