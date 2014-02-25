# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
=begin
require 'faker'
User.create!(name: "Example User",
             email: "blockytalky@mailinator.com",
             password: "foobar",
             password_confirmation: "foobar",
             school: "Tufts")
99.times do |n|
    name  = Faker::Name.name
    email = "blockytalky-#{n+1}@mailinator.com"
    password  = "password"
    school = Faker::Company.name
    User.create!(name: name,
                 email: email,
                 password: password,
                 password_confirmation: password,
                 school: school)
end
=end
