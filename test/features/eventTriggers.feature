@eventTrigger @functional
Feature: Set of scenarios to test functionality of event triggers in case view

    Background:
        Given I have logged in

    Scenario: viewing Event Selector dropdown
        Given I have the permission to an event
        When I access the case details
        Then I am able to see the Event Selector 

    Scenario: selecting an event
        Given I have the permission to an event
        When I access the case details I am able to access the event selector list
        Then I am able to choose an event from the drop down which I have permission for
