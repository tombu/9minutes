source 'http://rubygems.org'

gem 'rake' #, '0.8.7'

gem 'rails', '3.0.5'
gem 'jquery-rails', '>= 0.2.6'

gem 'sqlite3'
gem 'sqlite3-ruby', :require => 'sqlite3'

# templating
gem 'haml-rails'
gem "sass"

# for searching youtube
gem "youtube_it"

# for using last.fm api
gem 'typhoeus'

# for object caching
gem 'redis'
gem 'redis-namespace'

# for using 7digital api
gem '7digital'

# for asset packaging
gem 'closure'
gem 'jammit', :git => "git://github.com/documentcloud/jammit.git"
gem 'win32-open3-19' # win32-open3 in order to use POpen4 on Win32 (dependency of jammit)


# for converting json/xml to object
gem 'json'
gem 'hashie'

# authentication
gem 'devise'
gem 'oa-oauth', :require => 'omniauth/oauth'
gem 'oa-openid', :require => 'omniauth/openid'

# for file upload ( -> avatar )
gem 'paperclip',  '~> 2.3'

# youtube search
gem 'youtube_it'

group :development, :test do
  # for html2haml
  # gem 'hpricot'
  gem 'ruby_parser'
  
  # alternative servers (because openID URIs are too long for WEBRick)
  gem 'mongrel', '1.2.0.pre2'

end

# Deploy with Capistrano
# gem 'capistrano'
