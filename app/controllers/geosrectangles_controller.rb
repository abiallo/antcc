class GeosrectanglesController < ApplicationController
  
  
    def create
      puts ("create rectangle--------------------------------------------") 
      @geosmap = Geosmap.find(current_user.geosmap_id)
      puts(params[:geosrectangle])
      geosrectangle = Geosrectangle.new(params[:geosrectangle])
      if geosrectangle.save
        @geosmap.geosrectangles<<(geosrectangle)
        puts('ssssssuuuuuuuccccceeeeeesssss')
        res={:success=>true,:content=>geosrectangle}
      else
        puts ("save failed.............")
        res = {:success=>false,:content=>"geosrectangle save not possible"}
      end
      render :text=>geosrectangle.to_json
    end
    
    def destroy
      puts ("destroy rectangle--------------------------------------------") 
      geosrectangle = Geosrectangle.find(params[:id])
      if geosrectangle.destroy
       res = {:success=>true,:content=>"rectangle deleted", :notice => "ppppppppppppp"}
      else
       res = {:success=>false,:content=>"delete operation failed", :notice => "prrrrrrrrrr"}
      end
      render :text=>res.to_json
    end
  
    def update
      puts ("update rectangle--------------------------------------------") 

      @geosrectangle = Geosrectangle.find(params[:id])
      @geosrectangle.update_attributes(params[:geosrectangle])
      if @geosrectangle.save 
        res={:success=>true,:content=>@geosrectangle}
      else
        res = {:success=>false,:content=>"rectangle update not possible"}
      end
      render :text=>res.to_json
    end

    def list
      puts ("list rectangles--------------------------------------------")    
      @geosmap = Geosmap.find(current_user.geosmap_id)
      render :text => (@geosmap.geosrectangles).to_json
#    render :text=>(Track.find :all).to_json
    end
  
  
end
