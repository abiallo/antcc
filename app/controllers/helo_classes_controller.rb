class HeloClassesController < ApplicationController
  # GET /helo_classes
  # GET /helo_classes.xml
  def index
    @helo_classes = HeloClass.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @helo_classes }
    end
  end

  # GET /helo_classes/1
  # GET /helo_classes/1.xml
  def show
    @helo_class = HeloClass.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @helo_class }
    end
  end

  # GET /helo_classes/new
  # GET /helo_classes/new.xml
  def new
    @helo_class = HeloClass.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @helo_class }
    end
  end

  # GET /helo_classes/1/edit
  def edit
    @helo_class = HeloClass.find(params[:id])
  end

  # POST /helo_classes
  # POST /helo_classes.xml
  def create
    @helo_class = HeloClass.new(params[:helo_class])

    respond_to do |format|
      if @helo_class.save
        format.html { redirect_to(@helo_class, :notice => 'Helo class was successfully created.') }
        format.xml  { render :xml => @helo_class, :status => :created, :location => @helo_class }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @helo_class.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /helo_classes/1
  # PUT /helo_classes/1.xml
  def update
    @helo_class = HeloClass.find(params[:id])

    respond_to do |format|
      if @helo_class.update_attributes(params[:helo_class])
        format.html { redirect_to(@helo_class, :notice => 'Helo class was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @helo_class.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /helo_classes/1
  # DELETE /helo_classes/1.xml
  def destroy
    @helo_class = HeloClass.find(params[:id])
    @helo_class.destroy

    respond_to do |format|
      format.html { redirect_to(helo_classes_url) }
      format.xml  { head :ok }
    end
  end
end
