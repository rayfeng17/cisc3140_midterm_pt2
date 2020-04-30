# cisc3140 midterm part 2

Objectives: 
The objective is to create an input mask that formats telephone numbers in real-time.

It should present a user entered phone number xxxxxxxx as something like xxx-xxx-xxxx. Note: Choosing the - here as it is slightly easier to implement than with () characters for (XXX) XXX - XXXX. We will assume US phone numbers to keep it simple.

* The user will be entering in 1 key at a time.

* When 3 characters have been entered, a - should append the input to yield XXX-.

* When 6 characters have been entered, a - should append the input again to yield XXX-XXX-

* And finally after 10 characters have been entered, it should not accept any further input.
