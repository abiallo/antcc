class CreateGeoscoisUsers < ActiveRecord::Migration
  def self.up
    create_table :geoscois_users, :id => false do |t|
      t.references :geoscois
      t.references :users
    end
  end

  def self.down
    drop_table :geoscois_users
  end
end
