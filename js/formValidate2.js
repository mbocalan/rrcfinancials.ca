/*------------------

    Project 4 Website Development & Deployment
    Name: Marc Lawrence Bocalan
    Date: December 13, 2023
    Description: Project 4 Website Development & Deployment

--------------------*/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
    // Hides all error elements on the page
    hideErrors();

    // Determine if the form has errors
    if (formHasErrors()) {
        // Prevents the form from submitting
        e.preventDefault();

        // When using onSubmit="validate()" in markup, returning false would prevent
        // the form from submitting
        return false;
    }

    // When using onSubmit="validate()" in markup, returning true would allow
    // the form to submit
    return true;
}


/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Reset?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
    let errorFlag = false;

    let requiredFields = ["name"];
    checkRequiredFields();

    function checkRequiredFields() {
        for (let i = 0; i < requiredFields.length; i++) {
            let textField = document.getElementById(requiredFields[i]);
            if (!formFieldHasInput(textField)) {
                document.getElementById(requiredFields[i] + "_error").style.display = "block";

                if (!errorFlag) {
                    textField.focus();
                    textField.select();
                }

                errorFlag = true;
            }
        }
    }

    requiredFields = ["phonenumber"];
    checkRequiredFields();

    let cardNumber = document.getElementById("phonenumber").value;
	if(cardNumber.length !== 10){
		document.getElementById("phonenumberformat_error").style.display = "block";
        if (!errorFlag) {
            document.getElementById("phonenumber").focus();
            document.getElementById("phonenumber").select();
        }
		errorFlag = true;
	}

    requiredFields = ["email"];
    checkRequiredFields();

    let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    let email = document.getElementById("email").value;

    if (!emailRegex.test(email)) {
        document.getElementById("emailformat_error").style.display = "block";
        if (!errorFlag) {
            document.getElementById("email").focus();
            document.getElementById("email").select();
        }

        errorFlag = true;
    }

    requiredFields = ["comments"];
    checkRequiredFields();

    return errorFlag;
}


/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load() {
	// hide errors
	hideErrors();

		// Event listener for the form submit
		document.getElementById("validateForm").addEventListener("submit", validate);

		// Event listener for the Reset
		document.getElementById("validateForm").reset();
	
		// Event listener for our custom form submit function
		document.getElementById("validateForm").addEventListener("reset", resetForm);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);

