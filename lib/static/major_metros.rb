module MajorMetros
  # ZipCode prefixes within 25 miles of major metros with denser populations
  NEW_YORK = [
  "070", "074", "075", "076", "104", "105", "106", "107", "108", "109", "115", "077", "088", "103", "100", "101", "110", "117", "111", "113", "114", "118", "071", "079", "072", "112", "116", "102", "073"
  ]

  LOS_ANGELES = [
  "900", "902", "905", "906", "907", "908", "910", "917", "928", "903", "911", "918", "935", "904", "912", "913", "914", "915", "916"
  ]

  CHICAGO = [
  "605", "463", "464", "604", "606", "608", "600", "602", "607", "601", "603"
  ]

  HOUSTON = [
  "770", "772", "774", "775", "773"
  ]

  PHILADELPHIA = [
  "189", "190", "194", "080", "081", "191", "193", "197", "085", "083", "198"
  ]

  def in_major_metro?
    majors = [NEW_YORK, LOS_ANGELES, CHICAGO, HOUSTON, PHILADELPHIA].flatten
    majors.include?(code[0..2])
  end
end