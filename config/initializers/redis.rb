$redis = Redis.new(:host => 'localhost', :port => 6379)

begin
  $redis.ping
  puts "=> Established connection to redis server"
rescue
  puts "=> CAUTION: cound not establish connection to redis server! Check settings in initializer!"
end