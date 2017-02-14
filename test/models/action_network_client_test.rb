require 'test_helper'

class ActionNetworkClientTest < ActiveSupport::TestCase
  setup do
    stub_action_network_success
    @client = ActionNetworkClient.new
    @people = @client.get_people
  end

  test '#get_people returns an array of people with contact details' do
    assert_equal(@people.class, Array)
    @people.each do |person|
      assert_includes(person, :given_name)
      assert_includes(person, :family_name)
      assert_includes(person, :email_address)
      assert_includes(person, :phone_number)
    end
  end
end

def stub_action_network_success
  success_fixture = file_fixture('action_network_people_sucess.json')
  stub_request(:get, 'https://actionnetwork.org/api/v2/people').to_return({
    status: 200,
    body: success_fixture
  })
end