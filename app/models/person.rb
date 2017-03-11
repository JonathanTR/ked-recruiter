class Person < ApplicationRecord
  has_many :calls

  def available?
    !checked_out_at || !(checked_out_at > 5.hours.ago)
  end

  def check_in!
    update!(checked_out_at: nil)
  end

  def check_out!
    update!(checked_out_at: Time.now)
  end
end
