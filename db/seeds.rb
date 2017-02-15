require 'csv'
ZIP_DATA_PATH = 'lib/static/zip_codes_2013.csv'
FACTORY       = RGeo::Geographic.simple_mercator_factory

def progress_bar(current:, total:, bar_length:)
  percent = current / total.to_f * 100
  length = percent * bar_length / 100
  print "\r"
  print ('-' * length) + "> #{percent.to_i}%"
end

def create_zips
  puts "== Initializing ZipCodes ======================================================"
  idx = 0
  CSV.foreach(ZIP_DATA_PATH, {headers: true}) do |row|
    ZipCode.find_or_create_by(code: row['code']) do |zip|
      latitude = row['latitude'].to_f
      longitude = row['longitude'].to_f
      zip.coordinates = FACTORY.point(longitude,latitude)
    end
    idx += 1
    progress_bar(current: idx, total: 33134, bar_length: 73)
  end
  puts
  puts "== ZipCodes Loaded ============================================================"
end

create_zips
