ActionDispatch::Callbacks.to_prepare do
  LastFM::Request::api_key = ENV['lastfm_api_key']
end