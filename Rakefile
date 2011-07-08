# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)
require 'rake'
# require 'jammit'

module ::Nineminutes
  class Application
    include Rake::DSL if Rails.env.development? or Rails.env.test?
    # Jammit.package!
  end
end

module ::RakeFileUtils
  extend Rake::FileUtilsExt
end

Nineminutes::Application.load_tasks
