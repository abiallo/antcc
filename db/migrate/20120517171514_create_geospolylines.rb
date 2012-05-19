class CreateGeospolylines < ActiveRecord::Migration
  def self.up
    create_table :geospolylines do |t|
      t.string :name
      t.string :geometry
      t.timestamps
    end
  end

  def self.down
    drop_table :geospolylines
  end
end
