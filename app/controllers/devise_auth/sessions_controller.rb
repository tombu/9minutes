class DeviseAuth::SessionsController < Devise::SessionsController
  
  def new
    resource = build_resource
    clean_up_passwords(resource)
    respond_with_navigational(resource, stub_options(resource)){ render :partial => "devise/sessions/new" }
  end
  
  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#new")
    set_flash_message(:notice, :signed_in) if is_navigational_format?
    sign_in(resource_name, resource)
    redirect_to "/#!/home", :partial => "devise/registrations/new"
  end
end