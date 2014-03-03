Given /^I am not authenticated$/ do
    page.driver.submit :delete, destroy_user_session_path, {}
end

Given /^I am a new, authenticated user$/ do
    email = 'testing@man.net'
    name = 'test'
    school = 'myschool'
    @password = 'secretpass'
    @user = User.new(:email => email, :name => name, :school => school, :password => @password, :password_confirmation => @password)
    @user.save!

    step "I sign in with email \"#{email}\" and password \"#{@password}\""
end

Given /^the following users exist$/ do |users|
    User.create!(users.hashes)
end

When /^I sign in with email "(.*?)" and password "(.*?)"$/ do |email, pass|
    step "I go to the sign in page"
    step "I fill in \"user_email\" with \"#{email}\""
    step "I fill in \"user_password\" with \"#{pass}\""
    step "I press the button \"Sign in\""
end

When /^I change my username to "(.*?)"$/ do |newname|
    step "I go to the profile edit page"
    step "I fill in \"user_name\" with \"#{newname}\""
    step "I fill in \"user_current_password\" with \"#{@password}\""
    step "I press the button \"Update\""
end

Then /^I should see the account initialization form$/ do
      pending # express the regexp above with the code you wish you had
end

