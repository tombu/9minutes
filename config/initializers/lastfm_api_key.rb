ActionDispatch::Callbacks.to_prepare do
  LastFM::LastFMRequest::api_key = APP_CONFIG['lastfm_api_key']
end