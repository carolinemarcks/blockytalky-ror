class User < ActiveRecord::Base
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :trackable, :validatable

    # Setup accessible (or protected) attributes for your model
    attr_accessible :email, :password, :password_confirmation, :remember_me
    attr_accessible :isTeacher, :name, :school, :about_me
    has_many :codes, dependent: :destroy
    has_many :btus, dependent: :destroy

    # Include the friend model (see https://github.com/raw1z/amistad/wiki)
    include Amistad::FriendModel
end
