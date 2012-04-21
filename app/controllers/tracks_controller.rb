class TracksController < ApplicationController
  layout 'map' # will use the layout app/views/layouts/map.html.erb

  def create
    puts(params[:track])
    track = Track.new(params[:track])
      if track.save
        res={:success=>true,:content=>track}
      else
        puts ("save failed.............")
        res = {:success=>false,:content=>"track save not possible"}
      end
    render :text=>track.to_json
  end


  def index
#    render :text=>(Track.find :all).to_json
  end
  def list
    render :text=>(Track.find :all).to_json
  end
  
  def destroy
    track = Track.find(params[:id])
    if track.destroy
     res = {:success=>true,:content=>"track deleted"}
    else
     res = {:success=>false,:content=>"delete operation failed"}
    end
    render :text=>res.to_json
  end
  
  def update
   @track = Track.find(params[:id])
   @track.update_attributes(params[:m])
   if @track.save 
      res={:success=>true,:content=>@track}
   else
      res = {:success=>false,:content=>"track update not possible"}
   end
   render :text=>res.to_json
  end
  
  def updatepostime
   @track = Track.find(params[:id])
   time = Time.now
   timegmt =time.getgm
   @track.postime = timegmt + 3600*4
   if @track.save 
      res={:success=>true,:content=>@track}
   else
      res = {:success=>false,:content=>"track update not possible"}
   end
   render :text=>res.to_json
  end
end
