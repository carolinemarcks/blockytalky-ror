class Code < ActiveRecord::Base
    # https://github.com/airblade/paper_trail
    has_paper_trail :on => [:update], :ignore => [:title]

    def owned_by?(user)
        self.user_id == (user.try(:id) || user)
    end

    attr_accessible :codetext, :title, :description
    belongs_to :user
    has_many :code_urls, dependent: :destroy

    # Test for error - renders page weirdly but data isn't lost
    validates :user_id, presence: true
    validates :title, presence: true
    validates :codetext, presence: true
end
