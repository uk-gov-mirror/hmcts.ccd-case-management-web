Feature: sandbox for a sandbox feature

  @callback @run
  Scenario: Start callback service and assert we can get Hello World
    Given I have started a callback service
    And I have logged in
    Then I create a case
