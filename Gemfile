source 'http://rubygems.org'

gem 'rake'

gem 'rails', '3.2.11'
gem 'jquery-rails', '1.0.12'

# templating
gem 'haml-rails'

# for youtube and 7digital APIs
gem 'youtube_it'
gem '7digital'

# for using last.fm api
gem 'typhoeus'

# for object caching
gem 'redis'
gem 'redis-namespace'

# for converting json/xml to object
gem 'json'
gem 'hashie'

# authentication
gem 'devise'
gem 'omniauth'
gem 'omniauth-facebook'
gem 'omniauth-openid'

# for file upload ( -> avatar )
gem 'paperclip',  '~> 2.3'

gem 'pg', group: :production

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier',     '>= 1.0.3'
end

group :development, :test do
  gem 'sqlite3'
  gem 'sqlite3-ruby', :require => 'sqlite3'

  # gem 'hpricot' # for html2haml
  gem 'ruby_parser'

  # alternative servers (because openID URIs are too long for WEBRick)
  gem 'mongrel', '1.2.0.pre2'
end
