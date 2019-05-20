Feature: Hide and show of basic fields from a condition within a collection

  Scenario Outline: field on same page appears when hide and show condition within a collection is met
    Given there is a collection containing a '<mandatoryOptional>' '<fieldType>' field
    When I complete the <showConditionType> condition for the field
    Then a '<mandatoryOptionalHiddenField>' basic field will be displayed
    And I fill out the Mandatory fields
    And I am able to submit the case

    Examples:
      | mandatoryOptional      | mandatoryOptionalHiddenField | showConditionType | fieldType  |
      | mandatory              | mandatory                    | equals            | text       |
      | optional               | optional                     | equals            | text       |
      | mandatory              | optional                     | equals            | text       |
      | optional               | mandatory                    | equals            | text       |
      | mandatory              | mandatory                    | contains          | text       |
      | optional               | optional                     | contains          | text       |
      | mandatory              | optional                     | contains          | text       |
      | optional               | mandatory                    | contains          | text       |
      | mandatory              | mandatory                    | equals            | yes-no     |
      | optional               | optional                     | equals            | yes-no     |
      | mandatory              | optional                     | equals            | yes-no     |
      | optional               | mandatory                    | equals            | yes-no     |
      | mandatory              | mandatory                    | contains          | yes-no     |
      | optional               | optional                     | contains          | yes-no     |
      | mandatory              | optional                     | contains          | yes-no     |
      | optional               | mandatory                    | contains          | yes-no     |
      | mandatory              | mandatory                    | equals            | fixed list |
      | optional               | optional                     | equals            | fixed list |
      | mandatory              | optional                     | equals            | fixed list |
      | optional               | mandatory                    | equals            | fixed list |
      | mandatory              | mandatory                    | contains          | fixed list |
      | optional               | optional                     | contains          | fixed list |
      | mandatory              | optional                     | contains          | fixed list |
      | optional               | mandatory                    | contains          | fixed list |

  Scenario Outline: field on next page appears when hide and show condition within a collection is met
    Given there is a collection containing a '<mandatoryOptional>' '<fieldType>' field
    When I complete the <showConditionType> condition for the field
    And navigate to the next page
    Then a '<mandatoryOptionalHiddenField>' basic field will be displayed
    And I fill out the Mandatory fields
    And I am able to submit the case

    Examples:
      | mandatoryOptional      | mandatoryOptionalHiddenField | showConditionType | fieldType  |
      | mandatory              | mandatory                    | equals            | text       |
      | optional               | optional                     | equals            | text       |
      | mandatory              | optional                     | equals            | text       |
      | optional               | mandatory                    | equals            | text       |
      | mandatory              | mandatory                    | contains          | text       |
      | optional               | optional                     | contains          | text       |
      | mandatory              | optional                     | contains          | text       |
      | optional               | mandatory                    | contains          | text       |
      | mandatory              | mandatory                    | equals            | yes-no     |
      | optional               | optional                     | equals            | yes-no     |
      | mandatory              | optional                     | equals            | yes-no     |
      | optional               | mandatory                    | equals            | yes-no     |
      | mandatory              | mandatory                    | contains          | yes-no     |
      | optional               | optional                     | contains          | yes-no     |
      | mandatory              | optional                     | contains          | yes-no     |
      | optional               | mandatory                    | contains          | yes-no     |
      | mandatory              | mandatory                    | equals            | fixed list |
      | optional               | optional                     | equals            | fixed list |
      | mandatory              | optional                     | equals            | fixed list |
      | optional               | mandatory                    | equals            | fixed list |
      | mandatory              | mandatory                    | contains          | fixed list |
      | optional               | optional                     | contains          | fixed list |
      | mandatory              | optional                     | contains          | fixed list |
      | optional               | mandatory                    | contains          | fixed list |


  Scenario Outline: field on same page does not appear when hide and show condition within a collection is not met
    Given there is a collection containing a '<mandatoryOptional>' '<fieldType>' field
    When I do not complete the <showConditionType> condition for the field
    Then a '<mandatoryOptionalHiddenField>' basic field basic field will not be displayed
    And I am able to submit the case

    Examples:
      | mandatoryOptional      | mandatoryOptionalHiddenField | showConditionType | fieldType  |
      | mandatory              | mandatory                    | equals            | text       |
      | optional               | optional                     | equals            | text       |
      | mandatory              | optional                     | equals            | text       |
      | optional               | mandatory                    | equals            | text       |
      | mandatory              | mandatory                    | contains          | text       |
      | optional               | optional                     | contains          | text       |
      | mandatory              | optional                     | contains          | text       |
      | optional               | mandatory                    | contains          | text       |
      | mandatory              | mandatory                    | equals            | yes-no     |
      | optional               | optional                     | equals            | yes-no     |
      | mandatory              | optional                     | equals            | yes-no     |
      | optional               | mandatory                    | equals            | yes-no     |
      | mandatory              | mandatory                    | contains          | yes-no     |
      | optional               | optional                     | contains          | yes-no     |
      | mandatory              | optional                     | contains          | yes-no     |
      | optional               | mandatory                    | contains          | yes-no     |
      | mandatory              | mandatory                    | equals            | fixed list |
      | optional               | optional                     | equals            | fixed list |
      | mandatory              | optional                     | equals            | fixed list |
      | optional               | mandatory                    | equals            | fixed list |
      | mandatory              | mandatory                    | contains          | fixed list |
      | optional               | optional                     | contains          | fixed list |
      | mandatory              | optional                     | contains          | fixed list |
      | optional               | mandatory                    | contains          | fixed list |

  Scenario Outline: field on next page does not appear when hide and show condition within a collection is not met
    Given there is a collection containing a '<mandatoryOptional>' '<fieldType>' field
    When I do not complete the <showConditionType> condition for the field
    And navigate to the next page
    Then a '<mandatoryOptionalHiddenField>' basic field basic field will not be displayed
    And I am able to submit the case

    Examples:
      | mandatoryOptional      | mandatoryOptionalHiddenField | showConditionType | fieldType  |
      | mandatory              | mandatory                    | equals            | text       |
      | optional               | optional                     | equals            | text       |
      | mandatory              | optional                     | equals            | text       |
      | optional               | mandatory                    | equals            | text       |
      | mandatory              | mandatory                    | contains          | text       |
      | optional               | optional                     | contains          | text       |
      | mandatory              | optional                     | contains          | text       |
      | optional               | mandatory                    | contains          | text       |
      | mandatory              | mandatory                    | equals            | yes-no     |
      | optional               | optional                     | equals            | yes-no     |
      | mandatory              | optional                     | equals            | yes-no     |
      | optional               | mandatory                    | equals            | yes-no     |
      | mandatory              | mandatory                    | contains          | yes-no     |
      | optional               | optional                     | contains          | yes-no     |
      | mandatory              | optional                     | contains          | yes-no     |
      | optional               | mandatory                    | contains          | yes-no     |
      | mandatory              | mandatory                    | equals            | fixed list |
      | optional               | optional                     | equals            | fixed list |
      | mandatory              | optional                     | equals            | fixed list |
      | optional               | mandatory                    | equals            | fixed list |
      | mandatory              | mandatory                    | contains          | fixed list |
      | optional               | optional                     | contains          | fixed list |
      | mandatory              | optional                     | contains          | fixed list |
      | optional               | mandatory                    | contains          | fixed list |



  Scenario Outline: page on same event appears when hide and show condition within a collection is met
    Given there is a collection containing a '<mandatoryOptional>' '<fieldType>' field
    When I do complete the <showConditionType> condition for the field
    And navigate to the next page
    Then the page 'hidden page' will be displayed
    And I am able to submit the case

    Examples:
      | mandatoryOptional      |  showConditionType | fieldType  |
      | mandatory              |  equals            | fixed list |
      | optional               |  equals            | fixed list |
      | mandatory              |  contains          | fixed list |
      | optional               |  contains          | fixed list |
      | mandatory              |  equals            | yes-no     |
      | optional               |  equals            | yes-no     |
      | mandatory              |  contains          | yes-no     |
      | optional               |  contains          | yes-no     |
      | mandatory              |  equals            | text       |
      | optional               |  equals            | text       |
      | mandatory              |  contains          | text       |
      | optional               |  contains          | text       |


  Scenario Outline: page on same event does not appear when hide and show condition within a collection is met
    Given there is a collection containing a '<mandatoryOptional>' '<fieldType>' field
    When I do not complete the <showConditionType> condition for the field
    And navigate to the next page
    Then the page 'hidden page' will not be displayed
    And I am able to submit the case

    Examples:
      | mandatoryOptional      |  showConditionType | fieldType  |
      | mandatory              |  equals            | fixed list |
      | optional               |  equals            | fixed list |
      | mandatory              |  contains          | fixed list |
      | optional               |  contains          | fixed list |
      | mandatory              |  equals            | yes-no     |
      | optional               |  equals            | yes-no     |
      | mandatory              |  contains          | yes-no     |
      | optional               |  contains          | yes-no     |
      | mandatory              |  equals            | text       |
      | optional               |  equals            | text       |
      | mandatory              |  contains          | text       |
      | optional               |  contains          | text       |



