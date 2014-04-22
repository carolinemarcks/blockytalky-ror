Btp::Application.routes.draw do
    devise_for :users

    resources :userwelcome

    authenticated :user do
        root :to => "userwelcome#index"
    end

    resources :code, :except => [:edit] do
        member do
            get 'uniqueId'
        end
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


    get '/static/:name.:ext' => redirect {|params, request| "/assets/static/#{params[:name]}.#{params[:ext]}?#{request.query_string}" }, constraints: { name: /.+/, ext: /(js|html|png|css|mp3|cur)/ }


    root :to => redirect("/users/sign_in")

    match 'frame2.html', to: 'userwelcome#show_frame'
end
