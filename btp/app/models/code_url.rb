class CodeUrl < ActiveRecord::Base
    before_create :generate_guid

    attr_accessible :codetext

    validates :codetext, presence: true

    def url format
        Rails.application.routes.url_helpers.fromGuid_code_url(self.guid)
    end

    protected
    def generate_guid
        self.guid = loop do
            random_token = SecureRandom.urlsafe_base64(32, false)
            break random_token unless CodeUrl.exists?(guid: random_token)
        end
    end
end
