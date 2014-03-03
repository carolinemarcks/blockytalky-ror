When /^I go to (.*?)$/ do |place|
    case place
    when "the home page"
        visit root_path
    when "the register page"
        visit new_user_registration_path
    when "the sign in page"
        visit new_user_session_path
    when "the profile edit page"
        visit edit_user_registration_path
    when "the code page"
        visit code_index_path
    else
        visit "#{place}"
    end
end
