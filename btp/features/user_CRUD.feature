Feature: User CRUD
    In order to use the BTU portal
    As a user of the BTU portal
    I should be able to create, login, update, and remove an account

    Scenario Outline: Create a new account
        Given I am not authenticated
        When I go to the register page
        And I fill in "user_email" with "<email>"
        And I fill in "user_name" with "<name>"
        And I fill in "user_school" with "<school>"
        And I fill in "user_password" with "<password>"
        And I fill in "user_password_confirmation" with "<password>"
        And I press "Sign up"
        Then I should see "<name>"

        Examples:
            | email            | name        | school    | password    |
            | testing@name.net | test name   | Tufts     | secret      |
            | foo@bar-baz.com  | foo         | FOO Skoo  | fBb&*()7890 |

    Scenario: Log into an existing account
        Given I am not authenticated
        And the following users exist
            | email            | name        | school    | password    |
            | testing@name.net | test name   | Tufts     | secret      |

        When I sign in with email "testing@name.net" and password "secret"
        Then I should see "Signed in successfully."

    Scenario: Willing to edit my account
        Given I am a new, authenticated user
        When I change my username to "bubbub"
        Then I should see "bubbub"
        # Add more checking stuff

