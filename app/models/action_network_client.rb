class ActionNetworkClient
  extend ActiveModel::Naming
  attr_reader :errors

  def initialize
    @errors = ActiveModel::Errors.new(self)
  end


  def get_people(zip, radius)
    nearby_zips = ZipCode.near(zip, radius)
    begin
      response = conn.get('api/v2/people') do |request|
        request.headers['ContentType'] = 'application/json'
        request.headers['OSDI-API-Token'] = api_key
        request.params = { filter: "postal_code eq #{nearby_zips.join(' or')}" }
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
      action_network_id:  action_network_id_for(person),
      address:            person[:postal_addresses],
      email_address:      primary_email_for(person),
      family_name:        person[:family_name],
      given_name:         person[:given_name],
      languages_spoken:   person[:languages_spoken],
      phone_number:       person[:custom_fields][:"Mobile number"],
    }
  end

  def action_network_id_for(symbolized_person)
    symbolized_person[:identifiers].find{|id| !!(id =~ /^action_network\:/)}
  end

  def primary_email_for(symbolized_person)
    addresses = symbolized_person[:email_addresses]
    if primary = addresses.find{|address| address[:primary]}
      primary[:address]
    else
      nil
    end
  end


  private

  def api_key
    Rails.application.secrets.action_network_api_key
  end

  def conn
    Faraday.new(url: 'https://actionnetwork.org/')
  end
end