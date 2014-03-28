Btp::Application.routes.draw do
    devise_for :users

    resources :userwelcome

    authenticated :user do
        root :to => "userwelcome#index"
    end

    resources :code, :except => [:edit] do
        member do
            get 'version/:version_id', to: 'code#version', as: 'version'
            get 'uniqueId'
            get 'version/:version_id/uniqueId', to: 'code#uniqueId'
        end
        #TODO: make this url better?
    end
    get 'code/fromGuid/:guid', to: 'code#fromGuid', as: 'fromGuid_code'
    
    resources :btu do
        member do
            post 'code/:code_id/upload', to: 'code_deploy#upload_code', as: 'upload_code'
            post 'stop_code', controller: 'code_deploy'
        end
    end
    resources :users, :only => [:index, :show] do
        member do
            post 'request_friend', controller: 'friendships'
            post 'approve_friend', controller: 'friendships'
        end
    end

    root :to => redirect("/users/sign_in")
    match 'frame2.html', to: 'userwelcome#show_frame'
end
