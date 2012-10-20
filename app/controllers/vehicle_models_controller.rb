class VehicleModelsController < ApplicationController
  # GET /vehicle_models
  # GET /vehicle_models.xml
  def index
    @vehicle_models = VehicleModel.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @vehicle_models }
    end
  end

  # GET /vehicle_models/1
  # GET /vehicle_models/1.xml
  def show
    @vehicle_model = VehicleModel.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @vehicle_model }
    end
  end

  # GET /vehicle_models/new
  # GET /vehicle_models/new.xml
  def new
    @vehicle_model = VehicleModel.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @vehicle_model }
    end
  end

  # GET /vehicle_models/1/edit
  def edit
    @vehicle_model = VehicleModel.find(params[:id])
  end

  # POST /vehicle_models
  # POST /vehicle_models.xml
  def create
    @vehicle_model = VehicleModel.new(params[:vehicle_model])

    respond_to do |format|
      if @vehicle_model.save
        format.html { redirect_to(@vehicle_model, :notice => 'Vehicle model was successfully created.') }
        format.xml  { render :xml => @vehicle_model, :status => :created, :location => @vehicle_model }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @vehicle_model.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /vehicle_models/1
  # PUT /vehicle_models/1.xml
  def update
    @vehicle_model = VehicleModel.find(params[:id])

    respond_to do |format|
      if @vehicle_model.update_attributes(params[:vehicle_model])
        format.html { redirect_to(@vehicle_model, :notice => 'Vehicle model was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @vehicle_model.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /vehicle_models/1
  # DELETE /vehicle_models/1.xml
  def destroy
    @vehicle_model = VehicleModel.find(params[:id])
    @vehicle_model.destroy

    respond_to do |format|
      format.html { redirect_to(vehicle_models_url) }
      format.xml  { head :ok }
    end
  end
end
