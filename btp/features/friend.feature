Feature: Friends
    In order to make friends
    As a user of the BTU protal
    I should be able to request, accept, and delete friends

    Scenario: Request a friend
        Given the following users exist
            | email            | name        | school    | password    |
            | testing@name.net | test name   | Tufts     | secret      |
            | afriend@name.net | a friend    | Tufts     | secret      |
        When I sign in with email "testing@name.net" and password "secret"
        And I request a friend with username "a friend"
        Then I should see my request for "a friend" is "pending"


    Scenario: Accept a request

    Scenario: Delete a friendship
