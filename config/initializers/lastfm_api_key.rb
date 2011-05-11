ActionDispatch::Callbacks.to_prepare do
  LastFM::LastFMRequest::api_key = '4c32e360f68553ec8fdca3711456b4f9'
end