Btp::Application.routes.draw do
    devise_for :users

    resources :userwelcome

    authenticated :user do
        root :to => "userwelcome#index"
        resources :code
        resources :btu
        resources :users, :only => [:index, :show] do
            member do
                post 'request_friend', controller: 'friendships'
                post 'approve_friend',  controller: 'friendships'
            end
        end
    end

    root :to => redirect("/users/sign_in")
    match 'frame2.html', to: 'userwelcome#show_frame'
end
