class GeosmarkersController < ApplicationController
  
    def create
    puts ("create marker--------------------------------------------") 
      @geosmap = Geosmap.find(current_user.geosmap_id)
      puts(params[:geosmarker])
      geosmarker = Geosmarker.new(params[:geosmarker])
      if geosmarker.save
        @geosmap.geosmarkers<<(geosmarker)
        puts('ssssssuuuuuuuccccceeeeeesssss')
        res={:success=>true,:content=>geosmarker}
      else
        puts ("save failed.............")
        res = {:success=>false,:content=>"geosmarker save not possible"}
      end
      render :text=>geosmarker.to_json
    end
    
    def destroy
      puts ("destroy marker--------------------------------------------") 
      geosmarker = Geosmarker.find(params[:id])
      if geosmarker.destroy
       res = {:success=>true,:content=>"marker deleted", :notice => "ppppppppppppp"}
      else
       res = {:success=>false,:content=>"delete operation failed", :notice => "prrrrrrrrrr"}
      end
      render :text=>res.to_json
    end
  
    def update
      puts ("update marker--------------------------------------------") 

      @geosmarker = Geosmarker.find(params[:id])
      @geosmarker.update_attributes(params[:geosmarker])
      if @geosmarker.save 
        res={:success=>true,:content=>@geosmarker}
      else
        res = {:success=>false,:content=>"marker update not possible"}
      end
      render :text=>res.to_json
    end

    def list
      puts ("list markers--------------------------------------------")    
      @geosmap = Geosmap.find(current_user.geosmap_id)
      render :text => (@geosmap.geosmarkers).to_json
#    render :text=>(Track.find :all).to_json
    end
  
end
