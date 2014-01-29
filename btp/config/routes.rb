Btp::Application.routes.draw do
  devise_for :users

    resources :userwelcome
    resources :code

    authenticated :user do
        root :to => "userwelcome#index"
    end

    root :to => redirect("/users/sign_in")
    match 'frame2.html', to: 'userwelcome#show_frame'
end
