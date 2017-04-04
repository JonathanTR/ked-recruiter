source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.1'

# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'

# Use PostGIS for proximity queries
gem 'activerecord-postgis-adapter', '~> 4.0.2'

# Use Puma as the app server
gem 'puma', '~> 3.0'

# Use Faraday for external API requests
gem 'faraday', '~> 0.11.0'

# Run multiple services
gem 'foreman', '~> 0.83.0'

# For throttling requests
gem 'rack-attack', '~> 5.0.1'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  gem 'pry', '~> 0.10.4'
  gem 'webmock', '~> 2.3.2'
  gem 'timecop', '~> 0.8.1'
end

group :development do
  gem 'listen', '~> 3.0.5'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
