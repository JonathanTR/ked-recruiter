class ZipCode < ApplicationRecord
  METERS_PER_MILE = 1609.34
  def self.near(code, miles)
    zip = where(code: code).first
    where(
      "ST_DWITHIN(zip_codes.lonlat, 'POINT(:lon :lat)', :distance)", {
      lon: zip.lonlat.x,
      lat: zip.lonlat.y,
      distance: miles.to_i * METERS_PER_MILE
    }).map(&:code)
  end
end
