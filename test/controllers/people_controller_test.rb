require 'test_helper'

class PeopleControllerTest < ActionDispatch::IntegrationTest
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
end
