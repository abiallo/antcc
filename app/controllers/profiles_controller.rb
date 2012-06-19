class ProfilesController < ApplicationController
  
  before_filter :authenticate, :except => [:show]  

  
  # GET /profiles/1
  # GET /profiles/1.xml
  def show
          puts ("show profile--------------------------------------------") 
    @profile = Profile.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @profile }
    end
  end
  
    # GET /profile/1/edit
  def edit
          puts ("edit profile--------------------------------------------") 
    @profile = Profile.find(params[:id])
  end
  
  # PUT /profiles/1
  # PUT /profiles/1.xml
  def update
          puts ("update profile--------------------------------------------") 
    @profile = Profile.find(params[:id])
    respond_to do |format|
      if @profile.update_attributes(params[:profile])
        format.html { redirect_to(@profile, :notice => 'profile was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @profile.errors, :status => :unprocessable_entity }
      end
    end
  end
  
end
