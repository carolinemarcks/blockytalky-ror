class CodeUrl < ActiveRecord::Base
    belongs_to :code
    before_create :generate_guid
    before_create :set_code_version

    attr_accessible :code_version

    validates :code_id, presence: true

    def versioned_code
        self.set_code_version
        versioned = self.code.versions[self.code_version]
        if versioned
            return versioned.reify
        else
            return self.code
        end
    end

    protected
    def generate_guid
        self.guid = loop do
            random_token = SecureRandom.urlsafe_base64(32, false)
            break random_token unless CodeUrl.exists?(guid: random_token)
        end
    end

    def set_code_version
        if self.code_version.nil?
            version = self.code.version
            if version.nil?
                self.code_version = self.code.versions.count
            else
                self.code_version = version.index
            end
        end
    end
end
