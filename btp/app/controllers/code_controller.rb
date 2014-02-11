class CodeController < ApplicationController
    before_filter :authenticate_user!
    before_filter :code_exists!, only: [:show, :version, :update, :destroy]
    before_filter :can_read_code!, only: [:show, :version, :update]
    before_filter :can_alter_code!, only: [:destroy]

    def code_exists!
        begin
            @code = Code.find(params[:id])
        rescue ActiveRecord::RecordNotFound
            flash[:alert] = "This code does not exist"
            redirect_to code_index_path
        end
    end

    def can_read_code!
        if not @code.owned_by?(current_user)
            if not current_user.friends.include? @code.user
                flash[:alert] = "You aren't friends with the owner of that code"
                redirect_to code_index_path
            end
        end
    end

    def can_alter_code!
        if not @code.owned_by?(current_user)
            flash[:alert] = "You do not have permission to modify this code"
            redirect_to code_index_path
        end
    end

    def show
    end

    def new
        @user = current_user
        if not flash[:friend_code_id]
            @code = @user.codes.new
        else
            begin
                friend_code = Code.find_by_id(flash[:friend_code_id])
                @code = friend_code.dup
                @code.user = current_user
            rescue ActiveRecord::RecordNotFound
                flash[:alert] = "The code you were trying to view has been deleted"
                @code = @user.codes.new
            end
        end
        Rails.logger.debug @code.inspect
    end

    def index
        @user = current_user
    end

    def update
        new_code = params[:code]
        version_id = new_code[:version_id]
        if not @code.user == current_user
            if version_id
                @code = @code.versions[version_id.to_i].reify
            end
            @code = @code.dup
            @code.user = current_user
            @code.save
        end
        @code.update_attributes(codetext: new_code[:codetext], title: new_code[:title], description: new_code[:description])
        if version_id
            destroy_versions_after @code.versions[version_id.to_i]
        end
        redirect_to @code
    end

    def create
        @code = current_user.codes.new(params[:code])
        if @code.save
            redirect_to @code
        else
            render "new"
        end
    end

    def destroy
        @user = current_user
        @user.codes.delete_if{|o| o.id == params[:id]}
        @code.versions.each do |v|
            v.destroy
        end
        @code.destroy
        redirect_to code_index_path
    end

    def version
        versioned = @code.versions[params[:version_id].to_i]
        if not versioned
            redirect_to @code
        else
            previous_version = versioned.reify
            if previous_version
                @code = previous_version
                render "show"
            else
                redirect_to @code
            end
        end
    end

    def destroy_versions_after version
        if version
            version = version.next
            while version
                tmp = version.next
                version.destroy
                version = tmp
            end
        end
    end
end
