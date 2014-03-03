Feature: Code Privacy
    In order to keep certain code snippets private
    As a user of the code management page
    I should be able to hide certain code snippets from friends

    Scenario Outline: Show/hide code
        Given I am a new, authenticated user
        And I have created a piece of code with the title "<title1>", description "<description1>", and program "<program1>"
        And I have created a piece of code with the title "<title2>", description "<description2>", and program "<program2>"
        And I have a friend
        When I hide the code with the title "<title1>"
        And I show the code with the title "<title2>"
        Then my friend should not be able to see my code

        Examples:
            | title1      | description1   | program1   | title2      | description2   | program2 |
            | Hello World | first program  | helloworld | Sensor Test | sensor program | sensor   | 
           
