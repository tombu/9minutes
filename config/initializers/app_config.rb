if Rails.env !=~ /production/
  APP_CONFIG = HashWithIndifferentAccess.new(YAML.load(File.open(File.join(Rails.root, 'config', 'config.yml'))))
  APP_CONFIG.each do |key, value|
    if value.is_a?(Hash)
      value.each do |k,v|
        ENV["#{key}_#{k}".upcase] = v
      end
    else
      ENV[(key.upcase)] = value
    end
  end
end