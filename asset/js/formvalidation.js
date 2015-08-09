/* ----------------------------------------------------------------------------------------------------*/ 
// FORM VALIDATION
/* ----------------------------------------------------------------------------------------------------*/ 


// Function to check is an input field is not empty 
function isNotEmpty(inputField) {
	if(inputField.val() == '') {		  
		  inputField.parent().parent().addClass('has-error');
		  var errorMsg = '<small class="help-block">' + inputField.attr('title') + '</small>'; 
		  if (inputField.parent().siblings('.help-block').size() == 0) {
			inputField.parent().parent().append(errorMsg);
		  }
	} else {
		inputField.parent().parent().removeClass('has-error');
		inputField.parent().siblings('.help-block').remove();
		return false; 	  			
	}	
	return true;
}


// Function to check is an input field is not empty 
function isNotEmptyEitherOr(inputField1,inputField2 ) {
	if (inputField1.val() == '' && inputField2.val() == '') {	
    	  inputField2.parent().parent().addClass('has-error');
		  var errorMsg = '<small class="help-block">' + inputField2.attr('title') + '</small>'; 
		  if (inputField2.parent().siblings('.help-block').size() == 0) {
			inputField2.parent().parent().append(errorMsg);
		  }
	} else {
		inputField1.parent().parent().removeClass('has-error');
		inputField1.parent().siblings('.help-block').remove();
		return false; 	  			
	}	
	return true;
}


// Function to test whether email address appears to be valid
function isValidEmailAddress(inputEmail) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
	var emailAddress = inputEmail.val();
	var emailLength = emailAddress.length;
	if (!pattern.test(emailAddress) && emailLength <= 80) {
		var errorMsg = 'Please enter a <strong>valid</strong> email address';
		$(inputEmail).parent().parent().append('<span class="help-block">' + errorMsg + '</small>').addClass('has-error');	
	}
	else if (emailLength > 80) {
		var errorMsg = 'Email address must be less than 80 characters'
		$(inputEmail).parent().parent().append('<small class="help-block">' + errorMsg + '</small>').addClass('has-error');	
	}
    return pattern.test(emailAddress);	
};

// Function the test whether phone number appears valid
function isValidPhone(phoneNumber) {
	var phoneRegExp = /^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/;
    var phoneVal = phoneNumber.val();
    var numbers = phoneVal.split("").length;
	if (6 <= numbers && numbers <= 20 && phoneRegExp.test(phoneVal)) {		
		return true;
    }
	else if (!phoneRegExp.test(phoneVal)) {
		phoneErrorMsg = 'Phone number contains invalid characters';
		$(phoneNumber).parent().parent().append('<small class="help-block">' + phoneErrorMsg + '</small>').addClass('has-error');
	}	
	else if (numbers >= 20) { 	
		phoneErrorMsg = 'Phone number can contain maximum 20 characters';	
		$(phoneNumber).parent().parent().append('<span class="help-block">' + phoneErrorMsg + '</small>').addClass('has-error');				
	}
	else if (numbers < 6) { 
		phoneErrorMsg = 'Phone number is too short';
		$(phoneNumber).parent().parent().append('<small class="help-block">' + phoneErrorMsg + '</small>').addClass('has-error');
	}

}

// Function to count words in textarea 
function countWords(textArea) {
	var elClass = textArea.attr('class');
	var minWords = 0;
	var maxWords = 25;
	var countControl = elClass.substring((elClass.indexOf('['))+1, elClass.lastIndexOf(']')).split(',');

		if(countControl.length > 1) {
			minWords = countControl[0];
			maxWords = countControl[1];
		} else {
			maxWords = countControl[0];
		}
			if ($('.wordCount').length == '0') { // verifies that wordCount element doesn't already exist to prevent multiple additions 		
				textArea.after('<div class="wordCount"><strong>0</strong> Words</div>');
			}
			var numWords = jQuery.trim(textArea.val()).split(' ').length;
				
			if(minWords > 0) {
				textArea.siblings('.wordCount').addClass('wordError');
				return false;
			}	
			if(textArea.val() === '') {
					numWords = 0;
				}
				textArea.siblings('.wordCount').children('strong').text(numWords);
				
				if(numWords < minWords || (numWords > maxWords && maxWords != 0)) {
					textArea.siblings('.wordCount').addClass('wordError');
					return false;
				} else {
					textArea.siblings('.wordCount').removeClass('wordError');
			}			
			return true;			
}; 





// DOCUMENT READY
jQuery(document).ready(function() {
	
	/* --------------------------------------------------------------------------------------*/
	// Form validation
	// Checks if form input fields are empty after user has selected field and tabbed away
	$('.register textarea.maxwords').each(function() {
		countWords($(this));	
	});
	
	$('form input.required').blur(function() {
		isNotEmpty($(this));
	});

	// Checks if form select box is empty or not when the user changes it
	$('form select').change(function() {
		isNotEmpty($(this));
	});
	
	/* Binds the countWords function to trigger for textareas for blur, keyup etc. */
	$('form textarea.maxwords').bind('keyup click blur focus change paste', function() {
		countWords($(this));
		if (!isNotEmpty($(this))) {				
			if (!countWords($(this))) {
				$(this).parent().parent().append('<small class="help-block">Ooops, too many words.</small>').addClass('has-error');					
			}
		}				
	});
	
	$('input[type=checkbox].required').click(function() {
		if ($(this).attr("checked") == true) {
		  	$(this).parent().parent().removeClass('has-error');
		  	$(this).parent().siblings('.help-block').remove();		
		}
	});		

	if ($("input[type=radio]").length) {
		$("input[type=radio]").click(function() {
			$(this).parent().parent().removeClass('has-error');
			$(this).parent().parent().siblings('.help-block').remove();		
		});
	};	
	
	$('.input-phone.required').blur(function() {
		if (!isNotEmpty($(this))) {			
			isValidPhone($(this), $(this).attr('id'))	
		}			
	});
	
	
	$('.input-email.required').blur(function() {
		if (!isNotEmpty($(this))) {		
			isValidEmailAddress($(this))
		}
	});
	
	
}); // end document ready



// CHECK FIELDS -----------------------------------------------------------
// Checks that all required fields have been entered 
// Also validates individual fields for correct content and size
// ------------------------------------------------------------------------
function checkFields(formname) {
	console.log('Checking form');
	var allFieldsComplete = true;	
	$(formname + ' input').removeClass('has-error');		
	$(formname + ' .help-block').remove();	
	$(formname + ' .control-group').removeClass('has-error');
	
	// Check if all fields have been entered, 
	// if field is empty adds a warning class and error message and sets variable allFieldsComplete to false
	$(formname + ' input[type=text].required').each(function() {
		if (isNotEmpty($(this))) {     
			console.log('A required field is empty');
			allFieldsComplete = false;
		}
	});		
	$(formname + ' input[type=checkbox].required').each(function() {			
		if ($(this).is(':checked') == false) {
			var errorMsg = $(this).attr('title');
			$(this).parent().parent().append('<small class="help-block">' + errorMsg + '</small>').addClass('has-error');
			allFieldsComplete = false;		
		}
	});

	// Checks if the state dropdown is not empty
	if ($(formname + ' .input-state option:selected').val() == '' || $(formname + ' .input-state option:selected').val() == 'Select a state') {
			var errorMsg = $('.input-state').attr('title');
			$('.input-state').parent().parent().append('<small class="help-block">' + errorMsg + '</small>').addClass('has-error');
			allFieldsComplete = false;
	};	
	
	// Checks if any textarea is not empty
	$(formname + ' textarea.required').each(function() {
		if (!isNotEmpty($(this))) {	// first checks that field is not empty					
			if (!countWords($(this))) { // calls function to count words if too many words outputs error
				$(this).parent().parent().append('<small class="help-block">Ooops, too many words. </small>').addClass('has-error');					
				allFieldsComplete = false;
			}
		}		
	});
    
    // Check if either file is attached or attachment url is included    
    if (isNotEmptyEitherOr($('#file'),$('#inputAttachment'))) {
        allFieldsComplete = false;
        console.log(allFieldsComplete);
    };    
    


	// Checks if email appears to be valid
	$(formname + ' .input-email.required').each(function() {		
		if (!isNotEmpty($(this))) {							
			if (!isValidEmailAddress($(this))) { // checks if email appears valid
				allFieldsComplete = false;
			}
		}
	});
	
	// Before submitting checks that phone is not empty and is valid 
	$(formname + ' .input-phone.required').each(function() {
		if (!isNotEmpty($(this))) {		
			if (!isValidPhone($(this),$(this).attr('id'))) {
				allFieldsComplete = false;
			}							
		}		
	});

	// Checks if at least on of the radio buttons inside QuestionRadio is selected 
	$(formname + ' .input-radiogroup').each(function() {

		var currentGroup = $(this).attr('id');					
		function verifyRadioChecked(activeGroup) {	
					
			var radioChecked = false;
			var inputSelector = '#' + activeGroup + ' input[type=radio]';

			$(inputSelector).each(function(){				
				if($(this).is(':checked')) {
					radioChecked = true;
					return true;
				}
			});
			if (!radioChecked) {				
				var errorMsg = $('#'+currentGroup).attr('title');					
				 $('#'+currentGroup).append('<small class="help-block">' + errorMsg + '</small>').addClass('has-error');					
				allFieldsComplete = false;																			
			}		
		}
		verifyRadioChecked(currentGroup);
	}); // radiogroup check
    

	return allFieldsComplete;
}; // end checkFields function

	


