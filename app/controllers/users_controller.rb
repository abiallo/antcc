class UsersController < ApplicationController
  before_filter :authenticate, :only => [:edit, :update]
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(params[:user])
    if @user.save
      @geosmap = Geosmap.new
      @geosmap.name = "_default"+@user.email
      @geosmap.centerlat = 33.0
      @geosmap.centerlng = 36.0
      @geosmap.user_id = @user.id
      @geosmap.zoom = 4
      @geosmap.maptype = "ROADMAP"
      @geosmap.milflag = "true"
      @geosmap.note = "default map created for the user " + @user.name
      @geosmap.save
      redirect_to articles_path, :notice => 'User successfully added. Default map successfully created'
    else
      render :action => 'new'
    end
  end
  
  def edit
#    @user = User.find(params[:id])
    @user = current_user
  end
  def update
#    @user = User.find(params[:id])
    @user = current_user
    if @user.update_attributes(params[:user])
      redirect_to articles_path, :notice => 'Updated user information successfully'
    else
      render :action => 'edit'  
    end
  end
end
