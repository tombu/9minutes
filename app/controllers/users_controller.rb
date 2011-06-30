class UsersController < ApplicationController
  def show
    @user = User.find params[:id]
    render :partial => "show", :locals => { :user => @user }
  end
  
  def edit
    @user = User.find params[:id]
    render :partial => "edit", :locals => { :user => @user }
  end
  
  def update
    current_user.update_attribute(:avatar, params[:user][:avatar]) if params[:user] and params[:user][:avatar]
    current_user.update_attribute(:username, params[:user][:username]) if params[:user] and params[:user][:username]
    async_redirect_to user_path(current_user)
  end

end
