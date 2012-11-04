class SeasubFunctionsController < ApplicationController
  before_filter :authenticate
  # GET /seasub_functions
  # GET /seasub_functions.xml
  def index
    @seasub_functions = SeasubFunction.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @seasub_functions }
    end
  end

  # GET /seasub_functions/1
  # GET /seasub_functions/1.xml
  def show
    @seasub_function = SeasubFunction.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @seasub_function }
    end
  end

  # GET /seasub_functions/new
  # GET /seasub_functions/new.xml
  def new
    @seasub_function = SeasubFunction.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @seasub_function }
    end
  end

  # GET /seasub_functions/1/edit
  def edit
    @seasub_function = SeasubFunction.find(params[:id])
  end

  # POST /seasub_functions
  # POST /seasub_functions.xml
  def create
    @seasub_function = SeasubFunction.new(params[:seasub_function])

    respond_to do |format|
      if @seasub_function.save
        format.html { redirect_to(@seasub_function, :notice => 'Seasub function was successfully created.') }
        format.xml  { render :xml => @seasub_function, :status => :created, :location => @seasub_function }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @seasub_function.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /seasub_functions/1
  # PUT /seasub_functions/1.xml
  def update
    @seasub_function = SeasubFunction.find(params[:id])

    respond_to do |format|
      if @seasub_function.update_attributes(params[:seasub_function])
        format.html { redirect_to(@seasub_function, :notice => 'Seasub function was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @seasub_function.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /seasub_functions/1
  # DELETE /seasub_functions/1.xml
  def destroy
    @seasub_function = SeasubFunction.find(params[:id])
    @seasub_function.destroy

    respond_to do |format|
      format.html { redirect_to(seasub_functions_url) }
      format.xml  { head :ok }
    end
  end
end
