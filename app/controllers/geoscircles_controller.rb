class GeoscirclesController < ApplicationController
  
    def create
      puts ("create circle--------------------------------------------") 
      @geosmap = Geosmap.find(current_user.geosmap_id)
      puts(params[:geoscircle])
      geoscircle = Geoscircle.new(params[:geoscircle])
      if geoscircle.save
        @geosmap.geoscircles<<(geoscircle)
        puts('ssssssuuuuuuuccccceeeeeesssss')
        res={:success=>true,:content=>geoscircle}
      else
        puts ("save failed.............")
        res = {:success=>false,:content=>"geoscircle save not possible"}
      end
      render :text=>geoscircle.to_json
    end
    
    def destroy
      puts ("destroy circle--------------------------------------------") 
      geoscircle = Geoscircle.find(params[:id])
      if geoscircle.destroy
       res = {:success=>true,:content=>"circle deleted", :notice => "ppppppppppppp"}
      else
       res = {:success=>false,:content=>"delete operation failed", :notice => "prrrrrrrrrr"}
      end
      render :text=>res.to_json
    end
  
    def update
      puts ("update circle--------------------------------------------") 

      @geoscircle = Geoscircle.find(params[:id])
      @geoscircle.update_attributes(params[:geoscircle])
      if @geoscircle.save 
        res={:success=>true,:content=>@geoscircle}
      else
        res = {:success=>false,:content=>"circle update not possible"}
      end
      render :text=>res.to_json
    end

    def list
      puts ("list circles--------------------------------------------")    
      @geosmap = Geosmap.find(current_user.geosmap_id)
      render :text => (@geosmap.geoscircles).to_json
#    render :text=>(Track.find :all).to_json
    end
  
end
