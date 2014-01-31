class Code < ActiveRecord::Base

    def owned_by?(user)
        self.user_id == (user.try(:id) || user)
    end

    attr_accessible :codetext, :user_id, :title, :description
    belongs_to :user

    validates :user_id, presence: true
    validates :title, presence: true
end
