Rails.application.routes.draw do
  get '/people', action: :index, controller: 'people'
  post '/people', action: :update, controller: 'people'
end
