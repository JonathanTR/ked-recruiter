class PeopleController < ApplicationController
  before_action :set_person, only: [:update]

  def index
    client = ActionNetworkClient.new
    zips = ZipCode.near(params[:zip], params[:radius])
    response = fetch_and_sync_records(client, zips)
    render json: response
  end

  def update
    if @person.update(checked_out: params[:checked_out])
      render json: @person
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  private
    def set_person
      if params[:action_network_id].blank?
        render json: { error: "Missing parameter: 'action_network_id'"}
      end
      @person = Person.find_by(action_network_id: params[:action_network_id])
    end

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
