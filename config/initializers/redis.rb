if Rails.env.development? or Rails.env.test? 
  uri_string = ENV['REDIS_DEVELOPMENT'].to_s
else
  uri_string = ENV['REDIS_PRODUCTION'].to_s
end

uri = URI.parse(URI.encode(uri_string))
$redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)

begin
  $redis.ping
  puts "=> Established connection to redis server on '#{uri.host}' (port #{uri.port})!"
rescue
  puts "=> CAUTION: could not establish connection to redis server on '#{uri.host}' (port #{uri.port})! Check settings in initializer!"
end