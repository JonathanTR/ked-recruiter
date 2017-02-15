# Load the Rails application.
require_relative 'application'

# Load files from lib folder
Rails.application.configure do
	config.autoload_paths += Dir["#{config.root}/lib/**/"]
end

# Initialize the Rails application.
Rails.application.initialize!
