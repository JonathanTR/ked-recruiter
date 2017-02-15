# README

### Dependencies
PostGres 9.6.2+
`$ brew install postgresql`

PostGIS 2.3.2+
`$ brew install postgis`

### Installation
Zip code lookup depends on a seeded table in the database. You will need to run
`$ rake db:seed` for it to work.