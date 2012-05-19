class Geosmap < ActiveRecord::Base
  validates :name, :presence => true
  belongs_to :user
  has_and_belongs_to_many :geoscircles
  has_and_belongs_to_many :geosmarkers
  has_and_belongs_to_many :geospolylines
  has_and_belongs_to_many :geospolygons
  has_and_belongs_to_many :geosrectangles
  has_and_belongs_to_many :tracks
  has_and_belongs_to_many :geoscois
  has_and_belongs_to_many :users
end
