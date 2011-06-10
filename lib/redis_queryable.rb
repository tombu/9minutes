module RedisQueryable

  VALID_NAMESPACES = [ :artist, :album, :chart ]
  EXPIRATION = {
    :artist => { :tracks => 3, :albums => 7, :similar => 14, :info => 7 }, 
    :chart => { :tracks => 10, :artists => 10 },
    :album => 28
  }
  
  def self.store namespace, key_hash, value
    key = build_key key_hash.values
    redis = switch_to_namespace namespace

    expires = key_hash.has_key?(:type) ? EXPIRATION[namespace][key_hash[:type]] : EXPIRATION[namespace]
    redis.setex key, expires.to_i.days, value
  end

  def self.get namespace, key_hash
    key = build_key key_hash.values
    redis = switch_to_namespace namespace
    json = redis.get key
    Hashie::Mash.new(JSON.parse(json))
  end
  
  def self.look_up_key namespace, key_hash, &block
    if exists_key? namespace, key_hash
      get namespace, key_hash
    else
      block.call
    end
  end
  
  
  private
  
  def self.exists_key? namespace, key_hash
    key = build_key key_hash.values
    redis = switch_to_namespace namespace
    redis.exists key
  end

  def self.build_key key_array
    key_array.flatten.map do |value|
      value.is_a?(String) ? Digest::SHA1.hexdigest(value) : value.to_s
    end.join(":")
  end

  def self.switch_to_namespace namespace
    return Redis::Namespace.new(namespace, :redis => $redis) if VALID_NAMESPACES.include? namespace
    $redis
  end

end