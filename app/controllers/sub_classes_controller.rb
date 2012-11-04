class SubClassesController < ApplicationController
  before_filter :authenticate
  # GET /sub_classes
  # GET /sub_classes.xml
  def index
    @sub_classes = SubClass.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @sub_classes }
    end
  end

  # GET /sub_classes/1
  # GET /sub_classes/1.xml
  def show
    @sub_class = SubClass.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @sub_class }
    end
  end

  # GET /sub_classes/new
  # GET /sub_classes/new.xml
  def new
    @sub_class = SubClass.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @sub_class }
    end
  end

  # GET /sub_classes/1/edit
  def edit
    @sub_class = SubClass.find(params[:id])
  end

  # POST /sub_classes
  # POST /sub_classes.xml
  def create
    @sub_class = SubClass.new(params[:sub_class])

    respond_to do |format|
      if @sub_class.save
        format.html { redirect_to(@sub_class, :notice => 'Sub class was successfully created.') }
        format.xml  { render :xml => @sub_class, :status => :created, :location => @sub_class }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @sub_class.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /sub_classes/1
  # PUT /sub_classes/1.xml
  def update
    @sub_class = SubClass.find(params[:id])

    respond_to do |format|
      if @sub_class.update_attributes(params[:sub_class])
        format.html { redirect_to(@sub_class, :notice => 'Sub class was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @sub_class.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /sub_classes/1
  # DELETE /sub_classes/1.xml
  def destroy
    @sub_class = SubClass.find(params[:id])
    @sub_class.destroy

    respond_to do |format|
      format.html { redirect_to(sub_classes_url) }
      format.xml  { head :ok }
    end
  end
end
