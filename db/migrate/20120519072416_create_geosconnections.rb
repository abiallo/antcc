class CreateGeosconnections < ActiveRecord::Migration
  def self.up
    create_table :geosconnections do |t|
      t.string :email
      t.integer :user_id
      t.timestamps
    end
  end

  def self.down
    drop_table :geosconnections
  end
end
