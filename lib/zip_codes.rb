require 'csv'

ZIP_DATA_PATH = 'lib/static/zip_codes_2013.csv'

class ZipCodes
	class << self
		def in_radius(code, radius)
			all_zips = load_zips

			boundary_in_km = radius * 1.60934
			origin_x, origin_y = all_zips[code.to_i]

			in_proximity = all_zips.select do |list_code|
				zip_x, zip_y = all_zips[list_code]
				x_dist = (lat_to_km(origin_x) - lat_to_km(zip_x)).abs
				y_dist = (long_to_km(origin_x, origin_y) - long_to_km(zip_x, zip_y)).abs
				radius_in_km = Math.sqrt((x_dist ** 2) + (y_dist ** 2))
				radius_in_km <= boundary_in_km
			end

			# Zeros get dropped for those East Coast cities. Pad them back in.
			in_proximity.keys.map{|zip| '%05i' % zip}
		end

		def lat_to_km(lat)
			lat * 110.574
		end

		def long_to_km(lat, lon)
			lat_radians = lat * Math::PI / 180
			lon * Math.cos(lat_radians) * 111.320
		end

	  def load_zips
	  	zips = {}
	  	CSV.foreach(ZIP_DATA_PATH, {headers: true}) do |row|
		  	zips[row['code'].to_i]	= [row['latitude'].to_f, row['longitude'].to_f]
	  	end
	  	zips
	  end
	end
end