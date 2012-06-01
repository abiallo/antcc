class TracksController < ApplicationController
#  before_filter  :load_geosmap
  layout 'map' # will use the layout app/views/layouts/map.html.erb

  def create
    puts ("create track--------------------------------------------") 
    puts ("geosmap")
    puts (current_user.geosmap_id)
    @geosmap = Geosmap.find(current_user.geosmap_id)
    puts (@geosmap)
    puts(params[:track])
    track = Track.new(params[:track])
      if track.save
        @geosmap.tracks<<(track)
        puts('ssssssuuuuuuuccccceeeeeesssss')
        res={:success=>true,:content=>track}
      else
        puts ("save failed.............")
        res = {:success=>false,:content=>"track save not possible"}
      end
    render :text=>track.to_json
  end


  def index
    puts ("index track--------------------------------------------") 
#    render :text=>(Track.find :all).to_json
  end
  
  def list
    puts ("list track--------------------------------------------")    
    @geosmap = Geosmap.find(current_user.geosmap_id)
    render :text => (@geosmap.tracks).to_json
#    render :text=>(Track.find :all).to_json
  end
  
  def destroy
    puts ("destroy track--------------------------------------------") 

    track = Track.find(params[:id])
    if track.destroy
     res = {:success=>true,:content=>"track deleted", :notice => "ppppppppppppp"}
    else
     res = {:success=>false,:content=>"delete operation failed", :notice => "prrrrrrrrrr"}
    end
    render :text=>res.to_json
  end
  
  def update
   puts ("update track--------------------------------------------") 

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
    puts ("updatepostime track--------------------------------------------") 

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
  def load_geosmap
        puts ("load_geosmap track--------------------------------------------") 

    @geosmap = Geosmap.find(params[:geosmap_id])
  end
end
