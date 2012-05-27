class GeosmapsController < ApplicationController
  before_filter :authenticate, :except => [:index, :show]  
  # GET /geosmaps
  # GET /geosmaps.xml
  def index
    @geosmaps = Geosmap.where(:user_id => current_user.id).all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @geosmaps }
    end
  end
  
  # GET /geosmaps/1
  # GET /geosmaps/1.xml
  def show
    @geosmap = Geosmap.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @geosmap }
    end
  end
  
    # GET /geosmaps/1/edit
  def edit
    @geosmap = Geosmap.find(params[:id])
  end
  
  # PUT /articles/1
  # PUT /articles/1.xml
  def update
    @geosmap = Geosmap.find(params[:id])

    respond_to do |format|
      if @geosmap.update_attributes(params[:geosmap])
        format.html { redirect_to(@geosmap, :notice => 'Geosmap was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @geosmap.errors, :status => :unprocessable_entity }
      end
    end
  end
 
  # DELETE /geosmaps/1
  # DELETE /geosmaps/1.xml
  def destroy
    @geosmap = Geosmap.find(params[:id])
    respond_to do |format|
      if @geosmap.name == "_default"+current_user.email
          format.html { render :action => "edit"  }
          format.xml  { render :xml => @geosmap.errors, :status => :unprocessable_entity }
      else
          @geosmap.destroy
          format.html { redirect_to(@geosmap, :notice => 'Geosmap was successfully deleted.') }
          format.xml  { head :ok }
      end
    end
  end
  
  # GET /geosmaps/new
  # GET /geosmaps/new.xml
  def new
    @geosmap = Geosmap.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @geosmap }
    end
  end

  # POST /geosmaps
  # POST /geosmaps.xml
  def create
    @geosmap = current_user.geosmaps.new(params[:geosmap])
    @geosmap.user_id = current_user.id

    respond_to do |format|
      if @geosmap.save
        format.html { redirect_to(@geosmap, :notice => 'Geosmap was successfully created.') }
        format.xml  { render :xml => @geosmap, :status => :created, :location => @geosmap }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @geosmap.errors, :status => :unprocessable_entity }
      end
    end
  end
  def display
      @geosmap = Geosmap.find(params[:id])
#     layout 'map' # will use the layout app/views/layouts/map.html.erb
#     render :nothing => true

      render 'tracks/index', :layout => 'map'

  end
  
  def currentmap
      puts ("currentmap--------------------------------------------") 
      @geosmap = Geosmap.find(params[:id])
#     layout 'map' # will use the layout app/views/layouts/map.html.erb
#     render :nothing => true
      render :text => Geosmap.find(params[:id]).to_json
  end  
end




