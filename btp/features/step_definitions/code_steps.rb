Given /^I have created a piece of code with the title "(.*?)", description "(.*?)", and program "(.*?)"$/ do |title, description, program|
    case program
    when 'helloworld'
        codetext = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="controls_if" inline="false" x="213" y="29"><value name="IF0"><block type="sensor_touch"><title name="port">1</title><title name="status">1</title></block></value><statement name="DO0"><block type="pin_out"><title name="gpio_out_pin">7</title><title name="gpio_out_value">1</title></block></statement></block></xml>'
    when 'sensor'
        codetext = '<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"controls_if\" inline=\"false\" x=\"207\" y=\"53\"><mutation else=\"1\"></mutation><value name=\"IF0\"><block type=\"logic_boolean\"><title name=\"BOOL\">TRUE</title></block></value><statement name=\"DO0\"><block type=\"controls_whileUntil\" inline=\"false\"><title name=\"MODE\">WHILE</title><value name=\"BOOL\"><block type=\"sensor_touch\"><title name=\"port\">1</title><title name=\"status\">1</title></block></value><statement name=\"DO\"><block type=\"pin_out\"><title name=\"gpio_out_pin\">7</title><title name=\"gpio_out_value\">1</title></block></statement></block></statement><statement name=\"ELSE\"><block type=\"pin_in\"><title name=\"gpio_in_pin\">12</title><title name=\"gpio_in_value\">1</title></block></statement></block></xml>'
    else
        codetext = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'
    end
    @code = Code.new(codetext: codetext, title: title, description: description)
    @code.user_id = @user.id
    @code.save!
end

Then /^I should see the blockly editor$/ do
    pending
    if page.respond_to? :should
        page.should have_css('div#BlocklyDiv')
    else
        page.has_selector?('div#BlocklyDiv') 
    end
end

Then /^I should see the title "(.*?)", description "(.*?)", and program "(.*?)"$/ do |arg1, arg2, arg3|
    pending # express the regexp above with the code you wish you had
end

When /^I change the (title|description|program) of the code to "(.*?)"$/ do |attribute, newcontent|
    case attribute
    when title
        @code.title = newcontent
    when description
        @code.description = newcontent
    when program
        @code.program = newcontent
    end
end

When /^I view the code with title "(.*?)"$/ do |title|
    visit code_index_path
    click title
end

When /^I delete the code with the title "(.*?)"$/ do |arg1|
    pending # express the regexp above with the code you wish you had
end

