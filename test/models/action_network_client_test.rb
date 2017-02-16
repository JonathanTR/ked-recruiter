require 'test_helper'

class ActionNetworkClientTest < ActiveSupport::TestCase
  test '#get_people returns an array of people with contact details' do
    stub_action_network_success
    client = ActionNetworkClient.new
    response = client.get_people('02122', 2)

    assert_equal(response[:people].class, Array)
    response[:people].each do |person|
      assert_includes(person, :given_name)
      assert_includes(person, :family_name)
      assert_includes(person, :email_address)
      assert_includes(person, :phone_number)
    end
  end

  test '#get_people handles a JSON error from ActionNetwork' do
    stub_action_network_400_error
    client = ActionNetworkClient.new
    response = client.get_people('02122', 2)

    expected = 'API Key invalid or not present abdefg'
    actual = response[:error]
    assert_equal(expected, actual)
  end

  test '#get_people handles an HTML error from ActionNetwork' do
    stub_action_network_500_error
    client = ActionNetworkClient.new
    response = client.get_people('02122', 2)

    expected = 'Internal Server Error'
    actual = response[:error]
    assert_equal(expected, actual)
  end

  test '#get_people handles a general error raised in call' do
    stub_action_network_general_error
    client = ActionNetworkClient.new
    response = client.get_people('02122', 2)

    expected = 'General Error'
    actual = response[:error]
    assert_equal(expected, actual)
  end
end

def stub_action_network_success
  success_fixture = file_fixture('action_network_people_sucess.json')
  stub_request(:get, /https:\/\/actionnetwork.org\/api\/v2\/people.+/).to_return({
    status: 200,
    body: success_fixture
  })
end

def stub_action_network_400_error
  stub_request(:get, /https:\/\/actionnetwork.org\/api\/v2\/people.+/).to_return({
    status: 403,
    body: {"error"=>"API Key invalid or not present abdefg"}.to_json
  })
end

def stub_action_network_500_error
  error_fixture = file_fixture('action_network_people_error_500.html')
  stub_request(:get, /https:\/\/actionnetwork.org\/api\/v2\/people.+/).to_return({
    status: [500, 'Internal Server Error'],
    body: error_fixture,
  })
end

def stub_action_network_general_error
  stub_request(:get, /https:\/\/actionnetwork.org\/api\/v2\/people.+/).to_return({
    status: [500, 'Internal Server Error'],
    exception: 'General Error'
  })
end
