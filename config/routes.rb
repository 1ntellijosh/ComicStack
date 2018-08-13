Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'

  # Session controller routes.
  root   'sessions#index'
  get    'auth'            => 'sessions#auth' #Returns username and id if they're logged in

  # User actions
  get    '/users'          => 'users#index' # Returns logged in message if they're logged in
  get    '/users/current'  => 'users#current' #returns user if they're logged in
  post   '/users/create'   => 'users#create' # Creates the user
  patch  '/user/:id'       => 'users#update'
  delete '/user/:id'       => 'users#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get    '/queries/:query/:filter/:page'        => 'queries#find'
end
