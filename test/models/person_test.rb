require 'test_helper'

class PersonTest < ActiveSupport::TestCase
  test "throws an error without an action_network_id" do
    assert_raises(ActiveRecord::StatementInvalid) do
      Person.create(action_network_id: nil)
    end
  end

  test 'sets a timestamp when checked out' do
    person = people(:available)
    Timecop.freeze do
      person.check_out!
      assert_equal(Time.now, person.checked_out_at)
    end
  end

  test 'is available if they have never been checked out' do
    person = people(:available)
    assert_equal(true, person.available?)
  end

  test 'once checked out, is not available for five hours' do
    person = people(:available)
    person.check_out!
    assert_equal(false, person.available?)
    Timecop.travel(Time.now + 5.hours + 1.second) do
      assert_equal(true, person.available?)
    end
  end

  test 'is not available if they have been called' do
    person = people(:available)
    call = Call.create(person: person)
    assert_equal(false, person.available?)
  end

  test 'but it can be checked back in' do
    person = Person.create(action_network_id: "action_network:#{SecureRandom.uuid}")
    person.check_out!
    assert_equal(false, person.available?)
    person.check_in!
    assert_equal(true, person.available?)
  end
end
