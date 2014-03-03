Feature: Code CRUD
    In order to write code
    As a user of the code editor page
    I should be able to create, read/view, update, and destroy a piece of code

    Scenario Outline: Visit the create code page
        Given I am a new, authenticated user
        When I go to <page>
        Then I should see "Create New Code"

        Examples:
            | page      | 
            | /         |
            | /code     |

    Scenario: Create a piece of code
        Given I am a new, authenticated user
        When I go to the home page
        And I press "Create New Code" 
        Then I should see the blockly editor

    Scenario Outline: View a piece of code
        Given I am a new, authenticated user
        And I have created a piece of code with the title "<title>", description "<description>", and program "<program>"
        When I go to the code page
        And I click "<title>"
        Then I should see the title "<title>", description "<description>", and program "<program>"

        Examples:
            | title       | description    | program    |
            | Hello World | first program  | helloworld |
            | Sensor Test | sensor program | sensor     |

    Scenario Outline: Modify a piece of code
        Given I am a new, authenticated user
        And have created a piece of code with the title "<title>", description "<description>", and program "<program>"
        When I change the title of the code to "<newtitle>"
        And I change the description of the code to "<newdescription>"
        And I change the program to "<newprogram>"
        And I view the code with title "<newtitle>"
        Then I should see the title "<newtitle>", description "<newdescription>", and program "<newprogram>"
        And I should see the past history

        Examples:
            | title       | description    | program    | newtitle     | newdescription  | newprogram |
            | Hello World | first program  | helloworld | Sensor Test  | first program   | sensor     |
            | Sensor Test | sensor program | sensor     | Fun Program  | Fun description | helloworld |

    Scenario: Delete a piece of code
        Given I am a new, authenticated user
        And I have created a piece of code with the title "Hello World", description "first program", and program "helloworld"
        When I delete the code with the title "Hello World"
        And I go to the code page
        Then I should not see "Hello World"
