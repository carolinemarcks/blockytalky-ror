class Btu < ActiveRecord::Base
    def owned_by?(user)
        self.user_id == (user.try(:id) || user)
    end

    belongs_to :user

    attr_accessible :btuID, :id, :title
end
