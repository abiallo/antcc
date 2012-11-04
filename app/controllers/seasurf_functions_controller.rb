class SeasurfFunctionsController < ApplicationController
  before_filter :authenticate
  # GET /seasurf_functions
  # GET /seasurf_functions.xml
  def index
    @seasurf_functions = SeasurfFunction.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @seasurf_functions }
    end
  end

  # GET /seasurf_functions/1
  # GET /seasurf_functions/1.xml
  def show
    @seasurf_function = SeasurfFunction.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @seasurf_function }
    end
  end

  # GET /seasurf_functions/new
  # GET /seasurf_functions/new.xml
  def new
    @seasurf_function = SeasurfFunction.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @seasurf_function }
    end
  end

  # GET /seasurf_functions/1/edit
  def edit
    @seasurf_function = SeasurfFunction.find(params[:id])
  end

  # POST /seasurf_functions
  # POST /seasurf_functions.xml
  def create
    @seasurf_function = SeasurfFunction.new(params[:seasurf_function])

    respond_to do |format|
      if @seasurf_function.save
        format.html { redirect_to(@seasurf_function, :notice => 'Seasurf function was successfully created.') }
        format.xml  { render :xml => @seasurf_function, :status => :created, :location => @seasurf_function }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @seasurf_function.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /seasurf_functions/1
  # PUT /seasurf_functions/1.xml
  def update
    @seasurf_function = SeasurfFunction.find(params[:id])

    respond_to do |format|
      if @seasurf_function.update_attributes(params[:seasurf_function])
        format.html { redirect_to(@seasurf_function, :notice => 'Seasurf function was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @seasurf_function.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /seasurf_functions/1
  # DELETE /seasurf_functions/1.xml
  def destroy
    @seasurf_function = SeasurfFunction.find(params[:id])
    @seasurf_function.destroy

    respond_to do |format|
      format.html { redirect_to(seasurf_functions_url) }
      format.xml  { head :ok }
    end
  end
end
