APP_CONFIG = HashWithIndifferentAccess.new(YAML.load(File.open(File.join(Rails.root, 'config', 'config.yml'))))

require "sevendigital"
$sevendigital_client = Sevendigital::Client.new("config/sevendigital.yml", :country => "US")