When /^I fill in "(.*?)" with "(.*?)"$/ do |field, value|
    fill_in field, :with => value
end

When /^I (?:click|press) "(.*?)"$/ do |text|
    click_on text
end

When /^I (?:click|press) the button "(.*?)"$/ do |button|
    click_button button
end

When /^I (?:click|press) the link "(.*?)"$/ do |link|
    click_link link
end

Then /^I should see "(.*?)"$/ do |content|
    if page.respond_to? :should
        page.should have_content(content)
    else
     assert page.has_content?(content)
    end
end

Then /^I should not see "(.*?)"$/ do |content|
    if page.respond_to? :should
        page.should_not have_content(content)
    else
        assert page.has_no_content?(content)
    end
end

