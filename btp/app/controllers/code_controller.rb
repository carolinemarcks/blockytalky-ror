class CodeController < ApplicationController
    before_filter :authenticate_user!, except: [:fromGuid]
    before_filter :can_read_code!, only: [:show, :version, :update, :uniqueId]
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
        code_exists!
        if not @code.owned_by?(current_user)
            if not current_user.friends.include? @code.user
                flash[:alert] = "You aren't friends with the owner of that code"
                redirect_to code_index_path
            end
        end
    end

    def can_alter_code!
        code_exists!
        if not @code.owned_by?(current_user)
            flash[:alert] = "You do not have permission to modify this code"
            redirect_to code_index_path
        end
    end

    def show
        @user = current_user
    end

    def new
        @user = current_user
        @code = current_user.codes.new
    end

    def index
        @user = current_user
    end

    def update_code_attributes code, new_code
        code.update_attributes(codetext: new_code[:codetext], title: new_code[:title], description: new_code[:description])
    end

    def update
        version_id = params[:code][:version_id]
        if not @code.user == current_user
            @code = current_user.codes.new
            update_code_attributes @code, params[:code]
            @code.save
            redirect_to @code
        else
            update_code_attributes @code, params[:code]
            if version_id
                destroy_versions_after @code.versions[version_id.to_i]
                @code = Code.find(@code.id)
            end
            render "show"
        end
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

    #Creates a one-time-use unique url for a block of code
    #TODO: move uniqueId and fromGuid to their own controller?
    def uniqueId
        codeUrl = @code.code_urls.create
        redirect_to fromGuid_code_index_url(codeUrl.guid)
    end

    def fromGuid
        codeUrl = CodeUrl.find_by_guid(params[:guid])
        if not codeUrl
            render_404
        else
            @code = codeUrl.code
            render "show"
            codeUrl.destroy
        end
    end

    private
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
