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

  #All queries to the comic vine api
  get    '/queries/pull/:resource_type/:identifier' => 'queries#pull'
  get    '/queries/:query/:filter/:page'      => 'queries#find'

  #Character actions
  post   '/characters'     => 'characters#create'

  #Favorites actions
  post   '/favorites'     => 'favorites#create'
  get    '/favorites/all/:id' => 'favorites#index'
  delete '/favorites/:id' => 'favorites#delete'

  #Issue actions
  post   '/issues'     => 'issues#create'

  #Owns actions
  post   '/owns'     => 'owns#create'
  get    '/owns/:id'     => 'owns#show'
  delete '/owns/:id' => 'owns#delete'
end
