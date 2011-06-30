class DeviseAuth::RegistrationsController < Devise::RegistrationsController
  
  def new
    resource = build_resource({})
    respond_with_navigational(resource) { render :partial => "devise/registrations/new" }
  end
  
  def edit
    render :partial => "devise/registrations/edit"
  end
  
  def create
    build_resource

    if resource.save
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_navigational_format?
        sign_in(resource_name, resource)
        async_redirect_to user_path(resource)
      else
        set_flash_message :notice, :inactive_signed_up, :reason => resource.inactive_message.to_s if is_navigational_format?
        expire_session_data_after_sign_in!
        async_redirect_to user_path(resource)
      end
    else
      clean_up_passwords(resource)
      async_redirect_to new_user_registration_path
    end
  end
  
end