class Track < ActiveRecord::Base
#   validates :cstId, :presence => true
   has_and_belongs_to_many :geosmaps
end
