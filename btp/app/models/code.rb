class Code < ActiveRecord::Base

    def owned_by?(user)
	self.user_id == (user.try(:id) || user)
    end

    attr_accessible :title
    attr_accessible :codetext, :user_id
    belongs_to :user
end
