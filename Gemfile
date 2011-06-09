source 'http://rubygems.org'

gem 'rake' #, '0.8.7'

gem 'rails', '3.0.5'
gem 'jquery-rails', '>= 0.2.6'

# templating / styling
gem 'haml-rails'
gem "sass"

gem "youtube_it"

# for using last.fm api
gem 'typhoeus'
# gem 'httparty'

# for using 7digital api
gem '7digital'

# for converting json/xml to object
gem 'json'
gem 'hashie'

# authentication, authorization, roles
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
  # gem 'thin'
  
end

# Deploy with Capistrano
# gem 'capistrano'

# Bundle the extra gems:
# gem 'bj'
gem 'sqlite3'
gem 'sqlite3-ruby', :require => 'sqlite3'
# gem 'aws-s3', :require => 'aws/s3'

# Bundle gems for the local environment. Make sure to
# put test-only gems in this group so their generators
# and rake tasks are available in development mode:
# group :development, :test do
#   gem 'webrat'
# end
