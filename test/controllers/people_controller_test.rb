require 'test_helper'
require 'lib/action_network_stubs'

class PeopleControllerTest < ActionDispatch::IntegrationTest
  include ActionNetworkStubs

  setup do
    @person = people(:one)
  end

  test '#update should fail without required params' do
    post people_url(@person), params: {
      checked_out: true,
    }, as: :json
    body = JSON.parse(@response.body)
    assert_includes(body, 'error')
    assert_equal(body['error'], "Missing parameter: 'action_network_id'")
  end

  test "#update should update person" do
    record = Person.find_by(action_network_id: @person.action_network_id)
    assert_equal(record.available?, true)
    post people_url(@person), params: {
      action_network_id: @person.action_network_id,
      checked_out: true,
    }, as: :json
    record = Person.find_by(action_network_id: @person.action_network_id)
    assert_equal(record.reload.available?, false)
  end

  test "validates presence of zip code" do
    stub_action_network_success
    get people_url(params: {radius: 5})
    body = JSON.parse(response.body)
    assert_not_nil(body['error'])
  end

  test "validates presence of a radius" do
    stub_action_network_success
    get people_url(params: {zip: '02122'})
    body = JSON.parse(response.body)
    assert_not_nil(body['error'])
  end

  test "validates format of zip" do
    stub_action_network_success
    get people_url(params: {zip: '99999', radius: 25})
    body = JSON.parse(response.body)
    assert_includes(body['error'], 'not a real zip code')
  end

  test "validates format of radius" do
    stub_action_network_success
    get people_url(params: {zip: '02122', radius: 'abc'})
    body = JSON.parse(response.body)
    assert_includes(body['error'], 'not a valid radius')
  end
end
