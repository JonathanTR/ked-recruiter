require 'test_helper'
require 'lib/action_network_stubs'

class PeopleControllerTest < ActionDispatch::IntegrationTest
  include ActionNetworkStubs

  setup do
    @person = people(:available)
  end

  test '#update should fail without required params' do
    post people_url
    body = JSON.parse(@response.body)
    assert_includes(body, 'error')
    assert_equal(body['error'], "Missing parameter: 'action_network_id'")
  end

  test "#update should update person" do
    person = Person.create(action_network_id: 'abc', checked_out_at: Time.now)
    assert_equal(false, person.available?)

    post people_url params: {
      action_network_id: person.action_network_id,
      check_in: true
    }, as: :json

    assert_equal(true, person.reload.available?)
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
