require File.expand_path('../boot', __FILE__)
require 'rails/all'

Bundler.require(:default, :assets, Rails.env) if defined?(Bundler)

module Nineminutes
  class Application < Rails::Application
    config.autoload_once_paths += %W(#{config.root}/lib)

    # enable caching in development mode
    config.action_controller.perform_caching = true
    config.action_controller.page_cache_directory = Rails.root.to_s+"/public/cache/"

    # asset packaging
    config.serve_static_assets = true

    config.encoding = "utf-8"

    config.filter_parameters += [:password]

    # Enable the asset pipeline
    config.assets.enabled = true

    # Version of your assets, change this if you want to expire all your assets
    config.assets.version = '1.0'

    config.assets.initialize_on_precompile = false

    # Defaults to '/assets'
    # config.assets.prefix = '/asset-files'
  end
end
