class HomeController < ApplicationController

  def show    
    @files = Dir.glob("public/images/startsite/*.jpg")
    render :partial=>"index"
  end

end
