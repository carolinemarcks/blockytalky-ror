class Code < ActiveRecord::Base

    def owned_by?(user)
        self.user_id == (user.try(:id) || user)
    end

    attr_accessible :codetext, :user_id, :title, :description
    belongs_to :user

    validates :user_id, presence: true
    # Test for error - renders page weirdly but data isn't lost
    validates :title, presence: true
end
