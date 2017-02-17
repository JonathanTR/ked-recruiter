class PeopleController < ApplicationController
  def index
    client = ActionNetworkClient.new
    zips = ZipCode.near(params[:zip], params[:radius])
    response = fetch_and_sync_records(client, zips)
    render json: response
  end


  private
    def fetch_and_sync_records(client, zips, list = [], page = 1, limit = 10)
      response = client.request_people(zips, page)
      return response if response[:error]
      return {people: list} if response[:people].empty?
      response[:people].each do |person|
        return {people: list} if list.length >= limit
        record = Person.find_or_create_by(action_network_id: person[:action_network_id])
        if record.available?
          list << person
          record.update(checked_out: true)
        end
      end
      return fetch_and_sync_records(client, zips, list, page + 1)
    end
end
