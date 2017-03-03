require 'csv'
ZIP_DATA_PATH = 'lib/static/zip_codes_2013.csv'
FACTORY       = RGeo::Geographic.spherical_factory(srid: 4326)

def progress_bar(current:, total:, bar_length:)
  percent = current / total.to_f * 100
  length = percent * bar_length / 100
  print "\r"
  print ('-' * length) + "> #{percent.to_i}%"
end

def turn_off_logs
  old_level = ActiveRecord::Base.logger.level
  ActiveRecord::Base.logger.level = Logger::ERROR
end

def turn_on_logs(old_level)
  ActiveRecord::Base.logger.level = old_level
end

def bulk_insert_zips(codes, lonlats)
  """
  INSERT INTO zip_codes (code, lonlat)
    SELECT unnest(array[ #{codes.join(',')} ]),
           unnest(array[ #{lonlats.join(',')} ])
  """
end

def create_zips
  old_level = turn_off_logs
  puts "== Initializing ZipCodes ======================================================"
  ZipCode.delete_all
  idx = 0
  codes, lonlats = [], []
  CSV.foreach(ZIP_DATA_PATH, {headers: true}) do |row|
    idx += 1
    progress_bar(current: idx, total: 33134, bar_length: 73)
    codes << "'#{row['ZIP']}'"
    lonlats << "ST_GeomFromText('#{FACTORY.point(row['LNG'], row['LAT']).as_text}')"
  end
  ActiveRecord::Base.connection.execute(bulk_insert_zips(codes, lonlats))
  puts "\n== ZipCodes Loaded ============================================================"
  turn_on_logs(old_level)
end


create_zips
