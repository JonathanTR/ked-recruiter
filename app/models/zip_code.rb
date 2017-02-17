class ZipCode < ApplicationRecord
  METERS_PER_MILE = 1609.34
  def self.near(code, miles)
    zip = where(code: code).first
    where(
      "ST_DWITHIN(zip_codes.coordinates, 'POINT(:lon :lat)', :distance)", {
      lon: zip.coordinates.x,
      lat: zip.coordinates.y,
      distance: miles.to_i * METERS_PER_MILE
    }).map(&:code)
  end
end
