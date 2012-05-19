class CreateGeosrectangles < ActiveRecord::Migration
  def self.up
    create_table :geosrectangles do |t|
      t.string :name
      t.float :latSW
      t.float :lngSW
      t.float :latNE
      t.float :lngNE
      t.timestamps
    end
  end

  def self.down
    drop_table :geosrectangles
  end
end
