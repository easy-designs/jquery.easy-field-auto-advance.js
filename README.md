Easy Field Auto Advance
=======================

This script makes it simple to automatically-move a user to another 
field when the cursor reaches the end of the alotted space.

The API
-------

To use the script, add the `data-auto-advance-to` attribute to the
field you want to advance from and assign the id of the field to 
move to:

	<input type="text" name="username" required="required"
		maxlenght="3" data-auto-advance-to="NEXT_FIELD_ID" />