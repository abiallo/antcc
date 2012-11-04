class GeospolylinesController < ApplicationController
    before_filter :authenticate
      def create
      puts ("create polyline--------------------------------------------") 
      @geosmap = Geosmap.find(current_user.geosmap_id)
      puts(params[:geospolyline])
      geospolyline = Geospolyline.new(params[:geospolyline])
      if geospolyline.save
        @geosmap.geospolylines<<(geospolyline)
        puts('ssssssuuuuuuuccccceeeeeesssss')
        res={:success=>true,:content=>geospolyline}
      else
        puts ("save failed.............")
        res = {:success=>false,:content=>"geospolyline save not possible"}
      end
      render :text=>geospolyline.to_json
    end
    
    def destroy
      puts ("destroy polyline--------------------------------------------") 
      geospolyline = Geospolyline.find(params[:id])
      if geospolyline.destroy
       res = {:success=>true,:content=>"polyline deleted", :notice => "ppppppppppppp"}
      else
       res = {:success=>false,:content=>"delete operation failed", :notice => "prrrrrrrrrr"}
      end
      render :text=>res.to_json
    end
  
    def update
      puts ("update polyline--------------------------------------------") 

      @geospolyline = Geospolyline.find(params[:id])
      @geospolyline.update_attributes(params[:geospolyline])
      if @geospolyline.save 
        res={:success=>true,:content=>@geospolyline}
      else
        res = {:success=>false,:content=>"polyline update not possible"}
      end
      render :text=>res.to_json
    end

    def list
      puts ("list polylines--------------------------------------------")    
      @geosmap = Geosmap.find(current_user.geosmap_id)
      render :text => (@geosmap.geospolylines).to_json
#    render :text=>(Track.find :all).to_json
    end

  
  
end
