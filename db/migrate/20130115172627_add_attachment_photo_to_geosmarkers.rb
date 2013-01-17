class AddAttachmentPhotoToGeosmarkers < ActiveRecord::Migration
  def self.up
    change_table :geosmarkers do |t|
      t.attachment :photo
    end
  end

  def self.down
    drop_attached_file :geosmarkers, :photo
  end
end
