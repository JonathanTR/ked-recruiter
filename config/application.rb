require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Recruiter
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Load secrets from untracked local file, named development.env, production.env, etc.
    # Docker compose will do this automatically, but this allows the app to be
    # run outside of a container, if desired
    config.before_configuration do
      env_file = File.join(Rails.root, 'config', 'environments', "#{Rails.env.downcase}.env")
      if File.exists?(env_file)
        File.readlines(env_file).each do |line|
          next if line[0] == '#'
          key, value = line.chomp.split('=')
          ENV[key] = value
        end
      end
    end

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
  end
end
