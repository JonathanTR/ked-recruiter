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
    get people_url
    body = JSON.parse(response.body)
    assert_not_nil(body['error'])
  end

  test "validates format of zip" do
    stub_action_network_success
    get people_url(params: {zip: '99999'})
    body = JSON.parse(response.body)
    assert_includes(body['error'], 'not a real zip code')
  end

  test "creates a call record for the person and checks it back in" do
    stub_action_network_success
    post people_url(params: {
      action_network_id: @person.action_network_id,
      was_called: true
    }, as: :json)
    assert_equal(1, @person.calls.length)
    assert_nil(@person.checked_out_at)
  end

  test "tallies up the number records requested per week" do
    stub_action_network_success
    cookies['record_count'] = 10
    original_count = cookies['record_count'].to_i

    get people_url(params: {zip: '02122'})
    record_count = JSON.parse(response.body)['people'].length
    assert(cookies['record_count'].to_i === original_count + record_count)
  end

  test "throws an error if records requested exceeds limit" do
    stub_action_network_success
    cookies['record_count'] = PeopleController::MAX_RECORDS_PER_WEEK
    get people_url(params: {zip: '02122'})
    assert_equal(response.status, 429)
    assert_not_nil(JSON.parse(response.body)['error'])
  end
end
