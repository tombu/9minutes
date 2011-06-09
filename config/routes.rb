Nineminutes::Application.routes.draw do

  get "sidebar/index"

  get "charts/index"

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  devise_scope :user do
    get '/users/auth/:provider' => 'users/omniauth_callbacks#passthru'
  end

  get "tracks/index"
  get "artists/get_artists", :as => "get_artists"
  match "/artists/:artist", :to => "artists#show"
  match "/more_tracks", :to => "artists#more_tracks"
  match "/more_albums", :to => "artists#more_albums"
  match "/more_artists", :to => "search#more_artists"
  match "/more_charts", :to => "charts#more"
  get "artists/", :to => "artists#index"

  match "/autocomplete", :to => "search#autocomplete"
  match "/album_info", :to => "artists#album_info"
  match "/search_video", :to => "tracks#search_video"
  
  #resources :artists, :constraints => { :id => /.*/ }
  resources :users
  resources :sidebar
  resources :search
  
  get "home/", :to => "home#show"
  
  get "charts/", :to => "charts#index"
  

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => "home#index"
end
