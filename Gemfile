source 'http://rubygems.org'

gem 'rake'

gem 'rails', '3.1.3'
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
gem 'oa-oauth', :require => 'omniauth/oauth'
gem 'oa-openid', :require => 'omniauth/openid'

# for file upload ( -> avatar )
gem 'paperclip',  '~> 2.3'
gem 'jammit', '~> 0.6.5' #, :git => 'git://github.com/documentcloud/jammit.git'

group :assets do
  gem 'sass-rails',   '~> 3.1.5'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier',     '>= 1.0.3'
  gem 'closure'
  gem 'win32-open3-19' # win32-open3 in order to use POpen4 on Win32 (dependency of jammit)
end

group :development, :test do
  gem 'sqlite3'
  gem 'sqlite3-ruby', :require => 'sqlite3'

  # gem 'hpricot' # for html2haml
  gem 'ruby_parser'

  # alternative servers (because openID URIs are too long for WEBRick)
  gem 'mongrel', '1.2.0.pre2'
end
