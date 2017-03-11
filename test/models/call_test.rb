require 'test_helper'

class CallTest < ActiveSupport::TestCase
  test 'can not be created without a person reference' do
    assert_raises(ActiveRecord::RecordInvalid) do
      Call.create!(person_id: nil)
    end
  end
end
