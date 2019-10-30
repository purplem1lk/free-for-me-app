Rails.application.routes.draw do
  root 'homes#index'
  get '/listings', to: 'homes#index'
  get '/listings/new', to: 'homes#index'
  get '/listings/:id', to: 'homes#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :listings, only: [:index, :show, :create, :edit, :update, :destroy]
    end
  end
end
