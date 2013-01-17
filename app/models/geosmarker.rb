class Geosmarker < ActiveRecord::Base
  attr_accessible :photo, :name, :lat, :lng, :address
  has_and_belongs_to_many :geosmaps
  
  has_attached_file :photo,
      :styles => {
          :thumb => "100x100#",
          :small => "150x150>",
          :medium => "300x300>",
          :large => "400x400>"
#}
       },
        :url => "/system/:attachment/:id/:style/:basename.:extension",
        :path =>
          ":rails_root/public/system/:attachment/:id/:style/:basename.:extension"
          
  def owned_by?(owner)
    return false unless owner.is_a? User
#    user == owner
  end
end
