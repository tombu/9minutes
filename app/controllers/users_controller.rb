class UsersController < ApplicationController
  def show
    @user = User.find params[:user]
    render :partial => "show", :locals => { :user => @user }
  end
  
  def edit
    @user = User.find params[:user]
    render :partial => "edit", :locals => { :user => @user }
  end

end
