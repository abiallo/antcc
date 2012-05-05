require 'rubygems'
require 'sqlite3'
require 'active_record'
require 'logger'

$db = SQLite3::Database.open("development.sqlite3")
$db.results_as_hash = true

circumEquator = 40075160 # meters
circumPole = 40008000
piGreco = 3.1415926535 
radiusEq = circumEquator/(2*piGreco)
# puts ('radius =' + radiusEq.to_s)

ActiveRecord::Base.logger = Logger.new(STDERR)

ActiveRecord::Base.establish_connection(
    :adapter => "sqlite3",
    :database  => "development.sqlite3"
)


class Tracks < ActiveRecord::Base
end
puts"okok"
i = 0
R = radiusEq
  while true do
    trackArray = Tracks.find(:all)
    puts trackArray.length
while (i < trackArray.length)
  track = trackArray[i]
  if (track.speed != nil) 
   time = Time.now
   timegmt = time.getgm
   lat1 = track.lat
   long1 = track.long
   postime = track.postime
   deltaTime = time - postime
   if ((postime == nil) || (deltaTime > 300))
     postime = time
     end
   brng = track.course
   speed = (track.speed)*1000/3600
   d = speed * deltaTime
   lat1rad = lat1*piGreco/180
   long1rad = long1*piGreco/180
   brngrad = brng*piGreco/180
   dsuRrad = d/R*piGreco/180 
   lat2rad = Math.asin( Math.sin(lat1rad)*Math.cos(d/R) + Math.cos(lat1rad)*Math.sin(d/R)*Math.cos(brngrad))
   lat2 = lat2rad*180/piGreco
   puts ("lat2 "+lat2.to_s)
   long2rad = long1rad + Math.atan2(Math.sin(brngrad)*Math.sin(d/R)*Math.cos(lat1rad), Math.cos(d/R)-Math.sin(lat1rad)*Math.sin(lat2rad));                              
   long2 = long2rad*180/piGreco
   track.lat = lat2
   track.long = long2
   track.postime = time
   track.save
  end 
  i=i+1
end
puts("sleep")
sleep 5
end #while true
