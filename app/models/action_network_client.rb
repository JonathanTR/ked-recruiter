class ActionNetworkClient
	def get_people
		response = conn.get('api/v2/people') do |request|
			request.headers['ContentType'] = 'application/json'
			request.headers['OSDI-API-Token'] = api_key
		end
		normalize_response(JSON.parse(response.body))
	end


	def normalize_response(response)
		list = response['_embedded']['osdi:people']
		list.map{|details| normalize_person(details)}
	end

	def normalize_person(hash)
		person = hash.deep_symbolize_keys
		{
			given_name:       person[:given_name],
			family_name:      person[:family_name],
			email_address:    primary_email_for(person),
			phone_number:     person[:custom_fields][:"Mobile number"],
			address:          person[:postal_addresses],
			languages_spoken: person[:languages_spoken],
		}
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