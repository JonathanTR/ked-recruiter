Rails.application.routes.draw do
  root to: 'public#index'
  get '/people', action: :index, controller: 'people'
  post '/people', action: :update, controller: 'people'
end
