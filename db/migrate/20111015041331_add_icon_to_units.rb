class AddIconToUnits < ActiveRecord::Migration
  def self.up
    add_column :units, :friendicon, :string
    add_column :units, :neutralicon, :string
    add_column :units, :enemyicon, :string
    add_column :units, :unknownicon, :string
  end

  def self.down
    remove_column :units, :unknownicon
    remove_column :units, :enemyicon
    remove_column :units, :neutralicon
    remove_column :units, :friendicon
  end
end
