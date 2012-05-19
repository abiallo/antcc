class CreateGeoscircles < ActiveRecord::Migration
  def self.up
    create_table :geoscircles do |t|
      t.string :name
      t.float :lat
      t.float :lng
      t.integer :radius

      t.timestamps
    end
  end

  def self.down
    drop_table :geoscircles
  end
end
