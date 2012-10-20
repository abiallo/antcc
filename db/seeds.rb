# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

Category.create [{:name=>'Maps'},
                  {:name=>'Rails'},
                  {:name=>'C4I'},
                  {:name=>'Sharing'}]


User.create :email => 'geosbook@gmail.com', 
                  :password => 'password',
                 :password_confirmation => 'password',
                 :name => 'Guest',
                 :geosmap_id => 1

Geosmap.create :name => '_defaultgeosbook@gmail.com',
                         :centerlat => 33.0,
                         :centerlng => 36.0,
                         :user_id => 1,
                         :zoom => 4,
                         :maptype => "ROADMAP",
                         :milflag => "true",
                         :note => "default map created for the user geosbook@gmail.com"


Profile.create :name => 'Guest',
               :user_id => 1

Geoscoi.create :name => "_peer_connection_geosbook@gmail.com",
               :note => "peer connections for the user geosbook@gmail.com"
