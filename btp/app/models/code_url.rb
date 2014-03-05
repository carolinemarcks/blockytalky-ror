class CodeUrl < ActiveRecord::Base
    belongs_to :code
    before_create :generate_guid

    attr_accessible #none

    protected
    def generate_guid
        self.guid = loop do
            random_token = SecureRandom.urlsafe_base64(32, false)
            break random_token unless CodeUrl.exists?(guid: random_token)
        end
    end
end
