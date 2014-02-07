namespace :db do
    desc "Fill database with sample data"
    task populate: :environment do
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
    end
end
