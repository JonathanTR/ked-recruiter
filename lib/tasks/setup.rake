namespace :setup do
  desc 'Initial app setup including database create, setup, and seeding'
  task :all => :environment do
    Rake::Task["db:create"].invoke
    Rake::Task["db:gis:setup"].invoke
    Rake::Task["db:migrate"].invoke
    Rake::Task["db:seed"].invoke
  end
end
