class AddCpAndWeaponrangeToUnits < ActiveRecord::Migration
  def self.up
    add_column :units, :cp, :string
    add_column :units, :weaponrange, :integer
  end

  def self.down
    remove_column :units, :weaponrange
    remove_column :units, :cp
  end
end
