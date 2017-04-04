class ZipCode < ApplicationRecord
  include MajorMetros
  METERS_PER_MILE = 1609.34

  def self.near(zip_code, miles: 25)
    where(
      "ST_DWITHIN(zip_codes.lonlat, 'POINT(:lon :lat)', :distance)", {
      lon: zip_code.lonlat.x,
      lat: zip_code.lonlat.y,
      distance: miles.to_i * METERS_PER_MILE
    }).map(&:code)
  end
end
