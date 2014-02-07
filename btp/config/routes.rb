Btp::Application.routes.draw do
  devise_for :users

    resources :userwelcome

    authenticated :user do
      root :to => "userwelcome#index"
      resources :code
      resources :btu
      resources :users, :only => [:index, :show]
      post 'request_friend', to: 'friendships#request_friend'
    end

    root :to => redirect("/users/sign_in")
    match 'frame2.html', to: 'userwelcome#show_frame'

end
