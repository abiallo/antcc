class ShipClassesController < ApplicationController
  before_filter :authenticate
  # GET /ship_classes
  # GET /ship_classes.xml
  def index
    @ship_classes = ShipClass.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @ship_classes }
    end
  end

  # GET /ship_classes/1
  # GET /ship_classes/1.xml
  def show
    @ship_class = ShipClass.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @ship_class }
    end
  end

  # GET /ship_classes/new
  # GET /ship_classes/new.xml
  def new
    @ship_class = ShipClass.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @ship_class }
    end
  end

  # GET /ship_classes/1/edit
  def edit
    @ship_class = ShipClass.find(params[:id])
  end

  # POST /ship_classes
  # POST /ship_classes.xml
  def create
    @ship_class = ShipClass.new(params[:ship_class])

    respond_to do |format|
      if @ship_class.save
        format.html { redirect_to(@ship_class, :notice => 'Ship class was successfully created.') }
        format.xml  { render :xml => @ship_class, :status => :created, :location => @ship_class }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @ship_class.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /ship_classes/1
  # PUT /ship_classes/1.xml
  def update
    @ship_class = ShipClass.find(params[:id])

    respond_to do |format|
      if @ship_class.update_attributes(params[:ship_class])
        format.html { redirect_to(@ship_class, :notice => 'Ship class was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @ship_class.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /ship_classes/1
  # DELETE /ship_classes/1.xml
  def destroy
    @ship_class = ShipClass.find(params[:id])
    @ship_class.destroy

    respond_to do |format|
      format.html { redirect_to(ship_classes_url) }
      format.xml  { head :ok }
    end
  end
end
