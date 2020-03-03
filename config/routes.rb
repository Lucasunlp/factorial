Rails.application.routes.draw do
  root 'homepage#index'
  namespace :api do
    namespace :v1 do
      get 'contacts/index'
      get '/show/:id', to: 'contacts#show'
      post 'contacts/create', to: 'contacts#create'
      resources :contacts, only: %w[ index show edit update  ]
      put 'contacts/update', to: 'contacts#update'
      get 'contacts/:id/edit', to: 'contacts#edit'
      delete '/destroy/:id', to: 'contacts#destroy'
    end
  end
end
