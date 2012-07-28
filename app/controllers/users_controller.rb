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
      @profile = Profile.new
      @profile.save
      @user.profile = @profile
      @profile.name = @user.name
      @profile.save
      @geoscoi = Geoscoi.new
      @geoscoi.name = "_peer_connection_"+@user.email
      @geoscoi.note = "peer connections for the user "+ @user.email
      @geoscoi.save
      redirect_to articles_path, :notice => 'User successfully added. Default map successfully created'
    else
      render :action => 'new'
    end
  end
  
  def edit
#    @user = User.find(params[:id])
    @user = current_user
    @profile = @user.profile
  end
  def update
#    @user = User.find(params[:id])
    @user = current_user
    @profile = @user.profile
    if @user.update_attributes(params[:user])
      redirect_to articles_path, :notice => 'Updated user information successfully'
    else
      render :action => 'edit'  
    end
  end
  
  # GET /users
  # GET /users.xml
  def index
    @users = User.all
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @users }
    end
  end  
  
  # GET /users/1
  # GET /users/1.xml
  def show
    puts ("show user--------------------------------------------") 
    @user = User.find(params[:id])
    @profile = @user.profile

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @user }
    end
  end
  
  def email_geoscontact
    @user = User.find(params[:id])
    Geosmailer.email_geoscontact(params[:email], params[:name], params[:reply_to], params[:subject], params[:email_body]).deliver
    redirect_to @user, :notice => "Successfully sent a message"
  end  
end
