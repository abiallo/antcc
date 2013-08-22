class SessionsController < ApplicationController
  
  def create
    if user = User.authenticate(params[:email], params[:password])
      session[:user_id] = user.id
      @session_name = user.name
      redirect_to geosmaps_path, :notice => "Hello " + @session_name + ", logged in successfully"
    else
      flash.now[:alert] = "Invaild login/password combination"
      render :action => 'new'
    end
  end
  
  def destroy
    reset_session
    redirect_to root_path, :notice => "successfully logged out"
  end
end
