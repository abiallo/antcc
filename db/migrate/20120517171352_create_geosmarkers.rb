class CreateGeosmarkers < ActiveRecord::Migration
  def self.up
    create_table :geosmarkers do |t|
      t.string :name
      t.float :lat
      t.float :lng
      t.string :icon

      t.timestamps
    end
  end

  def self.down
    drop_table :geosmarkers
  end
end
