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
  
end
