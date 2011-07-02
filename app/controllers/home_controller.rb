class HomeController < ApplicationController
  def index
    @files = Dir.glob("public/images/startsite/*.jpg")
    
    render_remote :index
  end

end
