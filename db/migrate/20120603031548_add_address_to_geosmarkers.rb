class AddAddressToGeosmarkers < ActiveRecord::Migration
  def self.up
    add_column :geosmarkers, :address, :string
  end

  def self.down
    remove_column :geosmarkers, :address
  end
end
