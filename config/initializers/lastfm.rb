ActionDispatch::Callbacks.to_prepare do
  LastFM::Request::api_key = APP_CONFIG['lastfm_api_key']
end