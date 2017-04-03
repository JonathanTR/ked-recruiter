class PublicController < ApplicationController
  http_basic_authenticate_with({
    name: Rails.application.secrets.application_user,
    password: Rails.application.secrets.application_password
  })

  def index
    cookies[:login] ||= { value: 'login', expires: 5.minutes.from_now }
    render html: public_file('home.html')
  end


  private

  def public_file(name)
    File.read(Rails.public_path.join(name)).html_safe
  end
end
