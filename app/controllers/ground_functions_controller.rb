class GroundFunctionsController < ApplicationController
  before_filter :authenticate
  # GET /ground_functions
  # GET /ground_functions.xml
  def index
    @ground_functions = GroundFunction.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @ground_functions }
    end
  end

  # GET /ground_functions/1
  # GET /ground_functions/1.xml
  def show
    @ground_function = GroundFunction.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @ground_function }
    end
  end

  # GET /ground_functions/new
  # GET /ground_functions/new.xml
  def new
    @ground_function = GroundFunction.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @ground_function }
    end
  end

  # GET /ground_functions/1/edit
  def edit
    @ground_function = GroundFunction.find(params[:id])
  end

  # POST /ground_functions
  # POST /ground_functions.xml
  def create
    @ground_function = GroundFunction.new(params[:ground_function])

    respond_to do |format|
      if @ground_function.save
        format.html { redirect_to(@ground_function, :notice => 'Ground function was successfully created.') }
        format.xml  { render :xml => @ground_function, :status => :created, :location => @ground_function }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @ground_function.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /ground_functions/1
  # PUT /ground_functions/1.xml
  def update
    @ground_function = GroundFunction.find(params[:id])

    respond_to do |format|
      if @ground_function.update_attributes(params[:ground_function])
        format.html { redirect_to(@ground_function, :notice => 'Ground function was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @ground_function.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /ground_functions/1
  # DELETE /ground_functions/1.xml
  def destroy
    @ground_function = GroundFunction.find(params[:id])
    @ground_function.destroy

    respond_to do |format|
      format.html { redirect_to(ground_functions_url) }
      format.xml  { head :ok }
    end
  end
end
