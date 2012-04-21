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

#track = Tracks.find(:first, :conditions=>["cstName = ?","pluto33"])
#puts"okok"
#puts track.cstId


R = radiusEq
#################
thr = Thread.new do
  while true do
    trackArray = Tracks.find(:all)
    i = 0
while (i < trackArray.length)
  track = trackArray[i]
  if (track.speed != 0)
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
   speed = track.speed*1000/3600
   puts("R "+ R.to_s)
   puts("speed m/s = " + speed.to_s)
   puts("brng "+ brng.to_s)
   puts("lat1 "+lat1.to_s)
   puts("long1"+long1.to_s)
   puts("postime "+postime.to_s)
   puts("time now "+time.to_s)

   puts("deltaTime "+ deltaTime.to_s)
   d = speed * deltaTime
   puts ("distance m "+d.to_s)
   lat1rad = lat1*piGreco/180
   puts("lat1rad "+lat1rad.to_s)
   long1rad = long1*piGreco/180
   puts("long1rad"+long1rad.to_s)
   brngrad = brng*piGreco/180
   puts("brngrad"+brngrad.to_s)
   dsuRrad = d/R*piGreco/180 
   lat2rad = Math.asin( Math.sin(lat1rad)*Math.cos(d/R) + Math.cos(lat1rad)*Math.sin(d/R)*Math.cos(brngrad))
   lat2 = lat2rad*180/piGreco
   puts ("lat2 "+lat2.to_s)
   long2rad = long1rad + Math.atan2(Math.sin(brngrad)*Math.sin(d/R)*Math.cos(lat1rad), Math.cos(d/R)-Math.sin(lat1rad)*Math.sin(lat2rad));                              
   long2 = long2rad*180/piGreco
   puts("long2 "+ long2.to_s)
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
end #thread
thr.join # wait for thread to exit (never this case)
