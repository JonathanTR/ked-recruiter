module ActionNetworkStubs
  def stub_action_network_success(times: 1)
    success_fixture = file_fixture('action_network_people_success.json')
    stub_request(:get, /https:\/\/actionnetwork.org\/api\/v2\/people.+/)
    .to_return({
      status: 200,
      body: success_fixture
    }).times(times).then.to_return({
      status: 200,
      body: {
        _embedded: { 'osdi:people': [] }
      }.to_json
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
end

def response_body_shape
  {
    '_embedded': {
      'osdi:people': [
      ]
    }
  }
end
