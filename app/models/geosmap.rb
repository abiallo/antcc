class Geosmap < ActiveRecord::Base
  validates :name, :presence => true
  validates :centerlat, :presence => true
  validates_numericality_of :centerlat, :greater_than_or_equal_to => -180.0, :less_than_or_equal_to => 180.0
  validates :centerlng, :presence => true
  validates_numericality_of :centerlng, :greater_than_or_equal_to => 0.0, :less_than_or_equal_to => 360.0
  validates :zoom, :presence => true
  validates_numericality_of :zoom, :greater_than_or_equal_to => 0, :less_than_or_equal_to => 21, :only_integer => true
  validates :maptype, :presence => true  
  validates_inclusion_of :maptype, :in => ['HYBRID', 'ROADMAP', 'SATELLITE', 'TERRAIN', 'hybrid','terrain','roadmap','satellite']
  validates :milflag, :presence => true
  validates :milflag, :inclusion => {:in => ["true", "false"]}
  belongs_to :user
  has_and_belongs_to_many :geoscircles
  has_and_belongs_to_many :geosmarkers
  has_and_belongs_to_many :geospolylines
  has_and_belongs_to_many :geospolygons
  has_and_belongs_to_many :geosrectangles
  has_and_belongs_to_many :tracks
  has_and_belongs_to_many :geoscois
  has_and_belongs_to_many :users
  
    def owned_by?(owner)
    return false unless owner.is_a? User
    user == owner
  end
end
