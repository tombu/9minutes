Nineminutes::Application.routes.draw do

  get "charts/index"

  devise_for :users, 
    :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", :registrations => "registrations", :sessions => "sessions" }
  devise_scope :user do
    get "/users/auth/:provider" => "users/omniauth_callbacks#passthru"
    get "/register" => "devise_auth/registrations#new",   :as => :new_user_registration
    post "/users" => "devise_auth/registrations#create",  :as => :user_registration
    get "/login" => "devise_auth/sessions#new",           :as => :new_user_session
    post "/login" => "devise_auth/sessions#create",       :as => :user_session
    get "/logout" => "devise_auth/sessions#destroy",      :as => :destroy_user_session
  end

  get "tracks/index"
  match "/artists/:artist", :to => "artists#show"
  match "/more_tracks", :to => "artists#more_tracks"
  match "/more_albums", :to => "artists#more_albums"
  match "/more_artists", :to => "search#more_artists"
  match "/more_charts", :to => "charts#more"

  #get "artists/", :to => "artists#index"
  match "/users/:user", :to => "users#show"
  match "/users/:user/edit", :to => "users#edit"


  match "/autocomplete", :to => "search#autocomplete"
  match "/album_info", :to => "artists#album_info"
  match "/search_video", :to => "tracks#search_video"
  
  #resources :artists, :constraints => { :id => /.*/ }
  resources :search, :constraints => { :id => /.*/ }
  #resources :users, :only => [ :show ]
  
  get "home/", :to => "home#show"
  get "charts/", :to => "charts#index"
  
  root :to => "home#index"
end
