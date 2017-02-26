# namespace :db do
#   namespace :test do
#     desc 'Ensures that test databases are seeded with GeoData'
#     task :prepare => :environment do
#       Rake::Task["db:seed"].invoke
#     end
#   end

#   if Rails.env = 'development' || Rails.env == 'test'
#     desc 'The boom sauce. Wipes your database and rebuilds: handle with care'
#     task :boom do
#       puts 'WARNING: This will drop your database, recreate and re-seed.'
#       puts 'It is irreversible. Continue? [Yn]'
#       choice = $stdin.gets.chomp
#       if choice == 'Y'
#         Rake::Task["db:drop"].invoke
#         Rake::Task["db:create"].invoke
#         Rake::Task["db:migrate"].invoke
#         Rake::Task["db:seed"].invoke
#         Rake::Task["db:test:prepare"].invoke
#       end
#     end
#   end
# end