class GeospolygonsController < ApplicationController
  before_filter :authenticate
    def create
      puts ("create polygon--------------------------------------------") 
      @geosmap = Geosmap.find(current_user.geosmap_id)
      puts(params[:geospolygon])
      geospolygon = Geospolygon.new(params[:geospolygon])
      if geospolygon.save
        @geosmap.geospolygons<<(geospolygon)
        puts('ssssssuuuuuuuccccceeeeeesssss')
        res={:success=>true,:content=>geospolygon}
      else
        puts ("save failed.............")
        res = {:success=>false,:content=>"geospolygon save not possible"}
      end
      render :text=>geospolygon.to_json
    end
    
    def destroy
      puts ("destroy polygon--------------------------------------------") 
      geospolygon = Geospolygon.find(params[:id])
      if geospolygon.destroy
       res = {:success=>true,:content=>"polygon deleted", :notice => "ppppppppppppp"}
      else
       res = {:success=>false,:content=>"delete operation failed", :notice => "prrrrrrrrrr"}
      end
      render :text=>res.to_json
    end
  
    def update
      puts ("update polygon--------------------------------------------") 

      @geospolygon = Geospolygon.find(params[:id])
      @geospolygon.update_attributes(params[:geospolygon])
      if @geospolygon.save 
        res={:success=>true,:content=>@geospolygon}
      else
        res = {:success=>false,:content=>"polygon update not possible"}
      end
      render :text=>res.to_json
    end

    def list
      puts ("list polygons--------------------------------------------")    
      @geosmap = Geosmap.find(current_user.geosmap_id)
      render :text => (@geosmap.geospolygons).to_json
#    render :text=>(Track.find :all).to_json
    end


end
