class CreateSeasurfFunctions < ActiveRecord::Migration
  def self.up
    create_table :seasurf_functions do |t|
      t.string :name
      t.string :symbol
      t.string :code

      t.timestamps
    end
  end

  def self.down
    drop_table :seasurf_functions
  end
end
