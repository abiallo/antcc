class CreateSeasubFunctions < ActiveRecord::Migration
  def self.up
    create_table :seasub_functions do |t|
      t.string :name
      t.string :symbol
      t.string :code

      t.timestamps
    end
  end

  def self.down
    drop_table :seasub_functions
  end
end
