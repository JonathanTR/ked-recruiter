class Person < ApplicationRecord
  def available?
    !checked_out
  end

  def check_out
    update(checked_out: true)
  end
end
