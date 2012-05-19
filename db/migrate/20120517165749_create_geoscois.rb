class CreateGeoscois < ActiveRecord::Migration
  def self.up
    create_table :geoscois do |t|
      t.string :name
      t.text :note

      t.timestamps
    end
  end

  def self.down
    drop_table :geoscois
  end
end
