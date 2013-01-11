Nineminutes::Application.routes.draw do

  devise_for :users, :controllers => {
    :omniauth_callbacks => "users/omniauth_callbacks",
    :registrations => "devise_auth/registrations",
    :sessions => "devise_auth/sessions"
  }

  devise_scope :user do
    get "/users/auth/:provider" => "users/omniauth_callbacks#passthru"
    get "/register" => "devise_auth/registrations#new",   :as => :new_user_registration
    post "/users" => "devise_auth/registrations#create",  :as => :user_registration
    get "/login" => "devise_auth/sessions#new",           :as => :new_user_session
    post "/login" => "devise_auth/sessions#create",       :as => :user_session
    get "/logout" => "devise_auth/sessions#destroy",      :as => :destroy_user_session
  end

  get "/search_video", :to => "tracks#search_video"

  resources :artists, :only => [ :show ], :constraints => { :id => /.*/ }
  get "/more_tracks", :to => "artists#more_tracks"
  get "/more_albums", :to => "artists#more_albums"
  get "/album_info", :to => "artists#album_info"
  get "/favourize", :to => "artists#favourize"

  resources :search, :only => [ :show ], :constraints => { :id => /.*/ }
  get "/more_artists", :to => "search#more_artists"
  get "/autocomplete", :to => "search#autocomplete"

  get "/more_charts", :to => "charts#more"
  get "/charts", :to => "charts#index"

  resources :users, :only => [ :show, :update, :edit, :create ]

  get "/home", :to => "home#index"

  root :to => "home#index"
end
