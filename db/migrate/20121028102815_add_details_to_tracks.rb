class AddDetailsToTracks < ActiveRecord::Migration
  def self.up
    add_column :tracks, :height, :integer
    add_column :tracks, :platform_id, :integer
    add_column :tracks, :report_to, :integer
    add_column :tracks, :function_id, :integer
    add_column :tracks, :function_txt, :string
    
  end

  def self.down
    remove_column :tracks, :function_txt
    remove_column :tracks, :function_id
    remove_column :tracks, :function_id    
    remove_column :tracks, :report_to
    remove_column :tracks, :platform_id
    remove_column :tracks, :height
  end
end
