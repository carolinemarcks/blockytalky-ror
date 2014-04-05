class Code < ActiveRecord::Base
    # https://github.com/airblade/paper_trail
    has_paper_trail :on => [:update], :ignore => [:title]

    #http://stackoverflow.com/questions/328525/how-can-i-set-default-values-in-activerecord
    after_initialize :init
    def init
        self.privacy  ||= 'friends'
    end

    def owned_by?(user)
        self.user_id == (user.try(:id) || user)
    end

    # http://stackoverflow.com/questions/9590904/ruby-on-rails-activerecord-how-should-i-store-a-state-of-the-object
    def self.PRIVACY
        [ 'public', 'friends', 'private' ]
    end

    self.PRIVACY().each do |privacy|
        define_method("#{privacy}?") do
            self.privacy == privacy
        end

        define_method("#{privacy}!") do
            self.update_attribute(:privacy, privacy)
        end
    end

    attr_accessible :codetext, :title, :description, :privacy
    belongs_to :user

    # Test for error - renders page weirdly but data isn't lost
    validates :user_id, presence: true
    validates :title, presence: true
    validates :codetext, presence: true
    validates_length_of :codetext, :maximum => 16.megabyte
    validates :privacy, presence: true

    def unique_url
        CodeUrl.create(codetext: self.codetext)
    end
end
