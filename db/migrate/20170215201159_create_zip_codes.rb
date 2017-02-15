class CreateZipCodes < ActiveRecord::Migration[5.0]
  def up
  	create_table :zip_codes do |t|
  		t.string :code, unique: true, length: 5
		  t.st_point :coordinates, geographic: true, srid: 4326
		end
		add_index :zip_codes, :code
		add_index :zip_codes, :coordinates
  end

  def down
  	drop_table :zip_codes
  end
end
