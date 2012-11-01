class CreateGroundFunctions < ActiveRecord::Migration
  def self.up
    create_table :ground_functions do |t|
      t.string :name
      t.string :symbol
      t.string :code

      t.timestamps
    end
  end

  def self.down
    drop_table :ground_functions
  end
end
