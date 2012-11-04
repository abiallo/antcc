class AircraftClassesController < ApplicationController
  before_filter :authenticate
  # GET /aircraft_classes
  # GET /aircraft_classes.xml
  def index
    @aircraft_classes = AircraftClass.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @aircraft_classes }
    end
  end

  # GET /aircraft_classes/1
  # GET /aircraft_classes/1.xml
  def show
    @aircraft_class = AircraftClass.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @aircraft_class }
    end
  end

  # GET /aircraft_classes/new
  # GET /aircraft_classes/new.xml
  def new
    @aircraft_class = AircraftClass.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @aircraft_class }
    end
  end

  # GET /aircraft_classes/1/edit
  def edit
    @aircraft_class = AircraftClass.find(params[:id])
  end

  # POST /aircraft_classes
  # POST /aircraft_classes.xml
  def create
    @aircraft_class = AircraftClass.new(params[:aircraft_class])

    respond_to do |format|
      if @aircraft_class.save
        format.html { redirect_to(@aircraft_class, :notice => 'Aircraft class was successfully created.') }
        format.xml  { render :xml => @aircraft_class, :status => :created, :location => @aircraft_class }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @aircraft_class.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /aircraft_classes/1
  # PUT /aircraft_classes/1.xml
  def update
    @aircraft_class = AircraftClass.find(params[:id])

    respond_to do |format|
      if @aircraft_class.update_attributes(params[:aircraft_class])
        format.html { redirect_to(@aircraft_class, :notice => 'Aircraft class was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @aircraft_class.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /aircraft_classes/1
  # DELETE /aircraft_classes/1.xml
  def destroy
    @aircraft_class = AircraftClass.find(params[:id])
    @aircraft_class.destroy

    respond_to do |format|
      format.html { redirect_to(aircraft_classes_url) }
      format.xml  { head :ok }
    end
  end
end
