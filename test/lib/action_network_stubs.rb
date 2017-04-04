module ActionNetworkStubs
  def stub_action_network_success(times: 1)
    success_fixture = JSON.parse(File.read(file_fixture('action_network_people_success.json')))
    stub_request(:get, /https:\/\/actionnetwork.org\/api\/v2\/people.+/)
    .to_return({
      status: 200,
      body: generate_page(success_fixture, 25)
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


  private

  def generate_person(template)
    template.merge({
      'identifiers' => [ "action_network:#{SecureRandom.uuid}"],
      'given_name' => Faker::Name.first_name,
      'family_name' => Faker::Name.last_name,
      "email_addresses": [{
        "address": Faker::Internet.email,
        "primary": true,
        "status": "subscribed"
      }]
    })
  end

  def generate_page(fixture, number)
    template = fixture.dig('_embedded', 'osdi:people', 0)
    people = []
    number.times{ people << generate_person(template) }
    fixture.merge({
      '_embedded' => {
        'osdi:people' => people
      }
    }).to_json
  end
end
