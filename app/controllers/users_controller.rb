class UsersController < ApplicationController
  def show
    @user = User.find params[:id]
    puts @user.inspect
    render :partial => "show", :locals => { :user => @user }
  end

end
