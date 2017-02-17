require 'test_helper'
require 'lib/action_network_stubs'

class ActionNetworkClientTest < ActiveSupport::TestCase
  include ActionNetworkStubs

  test '#request_people returns an array of people with contact details' do
    stub_action_network_success
    client = ActionNetworkClient.new
    response = client.request_people(['02122'])

    assert_equal(response[:people].class, Array)
    response[:people].each do |person|
      assert_includes(person, :given_name)
      assert_includes(person, :family_name)
      assert_includes(person, :email_address)
      assert_includes(person, :phone_number)
    end
  end

  test '#request_people handles a JSON error from ActionNetwork' do
    stub_action_network_400_error
    client = ActionNetworkClient.new
    response = client.request_people(['02122'])

    expected = 'API Key invalid or not present abdefg'
    actual = response[:error]
    assert_equal(expected, actual)
  end

  test '#request_people handles an HTML error from ActionNetwork' do
    stub_action_network_500_error
    client = ActionNetworkClient.new
    response = client.request_people(['02122'])

    expected = 'Internal Server Error'
    actual = response[:error]
    assert_equal(expected, actual)
  end

  test '#request_people handles a general error raised in call' do
    stub_action_network_general_error
    client = ActionNetworkClient.new
    response = client.request_people(['02122'])

    expected = 'General Error'
    actual = response[:error]
    assert_equal(expected, actual)
  end
end
