@caseFilters @functional
Feature: Set of scenarios to test functionality of create case filters in case creation

    Background:
        Given I have logged in

    Scenario: submitting the Create case filters will navigate to the create case wizard page
        Given a case type containing every field type exists
        And I have filled out the create case filters
        When I click the 'Start' button
        Then I will be navigated to 'Create Case' wizard form page