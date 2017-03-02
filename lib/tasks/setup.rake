namespace :setup do
  desc 'Initial app setup including database create, setup, and seeding'
  task :all => :environment do
    return if database_exists?
    Rake::Task["db:create"].invoke
    Rake::Task["db:gis:setup"].invoke
    Rake::Task["db:migrate"].invoke
    Rake::Task["db:seed"].invoke
  end
end

def database_exists?
  ActiveRecord::Base.connection
rescue ActiveRecord::NoDatabaseError
  false
else
  true
end