APP_CONFIG = HashWithIndifferentAccess.new(YAML.load(File.open(File.join(Rails.root, 'config', 'config.yml'))))
APP_CONFIG.each do |key, value|
  ENV[key] = value
end