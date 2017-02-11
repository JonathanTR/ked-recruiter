class ActionNetworkClient
	def get_people
		response = conn.get('api/v2/people') do |request|
			request.headers['ContentType'] = 'application/json'
			request.headers['OSDI-API-Token'] = api_key
		end
		list = JSON.parse(response.body)['_embedded']['osdi:people']
		normalized_people(list)
	end


	private

	def normalized_people(list)
		list.map{|details| normalize_person(details)}
	end

	def normalize_person(hash)
		person = hash.symbolize_keys
		{
			given_name: person[:given_name],
			family_name: person[:family_name],
			email_address: person[:email_address],
			phone_number: person[:custom_fields][:Mobile_number],
			address: person[:postal_addresses],
			languages_spoken: person[:languages_spoken],
		}
	end

	def api_key
		Rails.application.secrets.action_network_api_key
	end

	def conn
		Faraday.new(url: 'https://actionnetwork.org/')
	end
end