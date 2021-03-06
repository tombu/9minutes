class DeviseAuth::SessionsController < Devise::SessionsController
  
  def new
    resource = build_resource
    clean_up_passwords(resource)
    respond_with_navigational(resource, stub_options(resource)){ render :partial => "devise/sessions/new" }
  end
  
  def create
    resource = warden.authenticate!(:scope => resource_name)
    async_redirect_to new_user_session_path unless resource
    set_flash_message(:notice, :signed_in) if is_navigational_format?
    sign_in(resource_name, resource)
    async_redirect_to user_path(resource)
  end
  
  def destroy
    signed_in = signed_in?(resource_name)
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    
    async_redirect_to charts_path
  end
end