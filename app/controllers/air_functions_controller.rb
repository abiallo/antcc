class AirFunctionsController < ApplicationController
  before_filter :authenticate
  # GET /air_functions air
  # GET /air_functions.xml
  def index
    @air_functions = AirFunction.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @air_functions }
    end
  end

  # GET /air_functions/1
  # GET /air_functions/1.xml
  def show
    @air_function = AirFunction.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @air_function }
    end
  end

  # GET /air_functions/new
  # GET /air_functions/new.xml
  def new
    @air_function = AirFunction.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @air_function }
    end
  end

  # GET /air_functions/1/edit
  def edit
    @air_function = AirFunction.find(params[:id])
  end

  # POST /air_functions
  # POST /air_functions.xml
  def create
    @air_function = AirFunction.new(params[:air_function])

    respond_to do |format|
      if @air_function.save
        format.html { redirect_to(@air_function, :notice => 'Air function was successfully created.') }
        format.xml  { render :xml => @air_function, :status => :created, :location => @air_function }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @air_function.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /air_functions/1
  # PUT /air_functions/1.xml
  def update
    @air_function = AirFunction.find(params[:id])

    respond_to do |format|
      if @air_function.update_attributes(params[:air_function])
        format.html { redirect_to(@air_function, :notice => 'Air function was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @air_function.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /air_functions/1
  # DELETE /air_functions/1.xml
  def destroy
    @air_function = AirFunction.find(params[:id])
    @air_function.destroy

    respond_to do |format|
      format.html { redirect_to(air_functions_url) }
      format.xml  { head :ok }
    end
  end
end
