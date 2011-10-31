class Track < ActiveRecord::Base
   validates :cstId, :presence => true
end
