class GeosmapsController < ApplicationController
  before_filter :authenticate, :except => [:index]  
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
    
end




