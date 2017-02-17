require 'test_helper'

class PersonTest < ActiveSupport::TestCase
  test "it throws an error without an action_network_id" do
    assert_raises(ActiveRecord::StatementInvalid){ Person.create }
  end
end
