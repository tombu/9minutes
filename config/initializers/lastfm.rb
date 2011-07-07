ActionDispatch::Callbacks.to_prepare do
  LastFM::Request::api_key = ENV['LASTFM_API_KEY']
end