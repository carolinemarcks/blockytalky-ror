class User < ActiveRecord::Base
  attr_accessible :email, :isTeacher, :name, :school
end
