Rails.application.routes.draw do
  root 'homes#index'
  get '/listings', to: 'homes#index'
  get '/listings/:id', to: 'homes#index'
  get '/listings/new', to: 'homes#index'
  get 's3/direct_post'
  get '/login', to: 'homes#index'

  devise_for :users, defaults: { format: :json }

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :listings, only: [:index, :show, :create, :update, :edit]
    end
  end

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end
end
