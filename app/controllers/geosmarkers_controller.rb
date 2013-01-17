class GeosmarkersController < ApplicationController
  before_filter :authenticate  


    def create
    puts ("create marker--------------------------------------------") 
      @geosmap = Geosmap.find(current_user.geosmap_id)
      puts(params[:geosmarker])
      geosmarker = Geosmarker.new(params[:geosmarker])
      geosmarker.photo = nil
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
  # PUT /geosmarkers/1
  # PUT /geosmarkers/1.json
  def update
#    @article = current_user.articles.find(params[:id])
      @geosmarker = Geosmarker.find(params[:id])

    respond_to do |format|
      if @geosmarker.update_attributes(params[:geosmarker])
        format.html { redirect_to @geosmarker, notice: 'Geosmarker was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @geosmarker.errors, status: :unprocessable_entity }
      end
    end
  end
    
    def updatemap
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
  


  # GET /geosmarkers
  # GET /geosmarkers.xml
  def index
      @geosmap = Geosmap.find(current_user.geosmap_id)
      @geosmarkers = @geosmap.geosmarkers
      respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @geosmarkers }
      end
  end
 
     # GET /geosmarkes/1/edit
  def edit
          puts ("edit geosmarker--------------------------------------------") 
    @geosmarker = Geosmarker.find(params[:id])
  end
   # GET /geosmaps/1
  # GET /geosmaps/1.xml
  def show
          puts ("show geosmarker--------------------------------------------") 
    @geosmarker = Geosmarker.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @geosmarker }
    end
  end
end