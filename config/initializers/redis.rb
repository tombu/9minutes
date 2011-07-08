uri = Rails.env ==~ /production/ ? URI.parse(ENV['REDIS_PRODUCTION']) : URI.parse(ENV['REDIS_DEVELOPMENT'])
$redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)

begin
  $redis.ping
  puts "=> Established connection to redis server on '#{uri.host}' (port #{uri.port})!"
rescue
  puts "=> CAUTION: could not establish connection to redis server on '#{uri.host}' (port #{uri.port})! Check settings in initializer!"
end