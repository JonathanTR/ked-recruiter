class PeopleController < ApplicationController
  before_action :set_person, only: [:update]
  before_action :validate_params, only: [:index]
  before_action :validate_zip, only: [:index]
  before_action :validate_radius, only: [:index]

  def index
    client = ActionNetworkClient.new
    zips = ZipCode.near(params[:zip], params[:radius])
    response = fetch_and_sync_records(client, zips)
    status = response.delete(:status)
    render json: response, status: status
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
        render json: { error: "Missing parameter: 'action_network_id'" },
               status: :bad_request
      end
      @person = Person.find_by(action_network_id: params[:action_network_id])
    end

    def validate_params
      [:zip, :radius].each do |param|
        if params[param].blank?
          render json: { error: "Missing parameter: '#{param}'" },
                 status: :bad_request
        end
      end
    end

    def validate_zip
      if ZipCode.find_by(code: params[:zip]).blank?
        render json: { error: "Sorry, #{params[:zip]} is not a real zip code 😿" },
               status: :bad_request
      end
    end

    def validate_radius
      if !params[:radius].match(/\d{1,3}/)
        render json: { error: "Sorry, #{params[:radius]} is not a valid radius 😿" },
               status: :bad_request
      end
    end

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
