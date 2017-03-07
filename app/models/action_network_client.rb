class ActionNetworkClient
  def request_people(zips, page = 1)
    begin
      response = conn.get('api/v2/people') do |request|
        request.headers['ContentType'] = 'application/json'
        request.headers['OSDI-API-Token'] = api_key
        request.params = { filter: "postal_code eq #{zips.join(' or postal_code eq ')}", page: page }
      end
      if response.success?
        { status: 200, people: normalize_response(JSON.parse(response.body)) }
      elsif !!(response.body[0..10] =~ /^<!DOCTYPE/)
        { status: response.status, error: response.reason_phrase }
      else
        { status: response.status, error: JSON.parse(response.body)['error'] }
      end
    rescue => error
      { status: 0, error: error.message }
    end
  end

  def normalize_response(response)
    list = response['_embedded']['osdi:people']
    list.map{|details| normalize_person(details)}
  end

  def normalize_person(hash)
    person = hash.deep_symbolize_keys
    {
      action_network_id:  get_action_network_id(person[:identifiers]),
      address:            filter_keys(get_primary(person[:postal_addresses]), :locality, :region, :country, :postal_code),
      email_address:      filter_keys(get_primary(person[:email_addresses]), :address),
      family_name:        person[:family_name],
      given_name:         person[:given_name],
      languages_spoken:   person[:languages_spoken],
      phone_number:       person[:custom_fields][:"Mobile number"],
    }
  end

  def get_action_network_id(identifiers)
    identifiers.find{|id| !!(id =~ /^action_network\:/)}
  end

  def filter_keys(hash, *key_list)
    key_list.length == 1 ? hash[key_list[0]] : hash.slice(*key_list)
  end

  def get_primary(elements)
    elements.find{|element| element[:primary]}
  end

  private

  def api_key
    Rails.application.secrets.action_network_api_key
  end

  def conn
    Faraday.new(url: 'https://actionnetwork.org/')
  end
end