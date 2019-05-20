Feature: Hide and show of fields and pages from a condition in a field within a complex type within a collection

  Scenario Outline: field within a collection of complex types appears when hide and show condition within the complex type is met
    Given there is a collection of complex types that contains a '<mandatoryOptional>' '<fieldType>' field
    When I complete the <showConditionType> condition for the field
    Then a '<mandatoryOptionalHiddenField>' basic field will be displayed within the complex type
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

  Scenario Outline: field within a collection of complex types does not appear when hide and show condition within the complex type is not met
    Given there is a collection of complex types that contains a '<mandatoryOptional>' '<fieldType>' field
    When I do not complete the <showConditionType> condition for the field
    Then a '<mandatoryOptionalHiddenField>' basic field will not be displayed within the complex type
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

  Scenario Outline: field outside a complex type appears when hide and show condition within a complex type is met
    Given there is a collection of complex types that contains a '<mandatoryOptional>' '<fieldType>' field
    When I complete the <showConditionType> condition for the field
    Then a '<mandatoryOptionalHiddenField>' basic field will be displayed in the collection and outside the complex type
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

  Scenario Outline: field outside a complex type does not appear when hide and show condition within a complex type is not met
    Given there is a collection of complex types that contains a '<mandatoryOptional>' '<fieldType>' field
    When I do not complete the <showConditionType> condition for the field
    Then a '<mandatoryOptionalHiddenField>' basic field will not be displayed inside the collection and outside the complex type
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

  Scenario Outline: field outside the collection of complex types appears when hide and show condition within a complex type is met
    Given there is a collection of complex types that contains a '<mandatoryOptional>' '<fieldType>' field
    When I complete the <showConditionType> condition for the field
    Then a '<mandatoryOptionalHiddenField>' basic field will be displayed outside the collection of complex types
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

  Scenario Outline: field outside a collection of complex types does not appear when hide and show condition within a complex type is not met
    Given there is a collection of complex types that contains a '<mandatoryOptional>' '<fieldType>' field
    When I do not complete the <showConditionType> condition for the field
    Then a '<mandatoryOptionalHiddenField>' basic field will not be displayed outside the collection of complex types
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

  Scenario Outline: field on next page appears when hide and show condition within a collection of complex type is met
    Given there is a collection of complex types that contains a '<mandatoryOptional>' '<fieldType>' field
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

  Scenario Outline: field on next page does not appear when hide and show condition within a collection of complex type is not met
    Given there is a collection of complex types that contains a '<mandatoryOptional>' '<fieldType>' field
    When I do not complete the <showConditionType> condition for the field
    And navigate to the next page
    Then a '<mandatoryOptionalHiddenField>' basic field will not be displayed
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

  Scenario Outline: page on same event appears when hide and show condition in a collection of complex types is met
    Given there is a collection of complex types that contains a '<mandatoryOptional>' '<fieldType>' field
    When I complete the <showConditionType> condition for the field
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


  Scenario Outline: page on same event does not appear when hide and show condition in a collection of complex type is not met
    Given there is a collection of complex types that contains a '<mandatoryOptional>' '<fieldType>' field
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


