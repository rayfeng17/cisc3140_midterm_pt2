// create a filter that will be used to determine which keystrokes are allowed in the input field
var filter = [];

//allows digits 0 - 9
// they can come from either the numeric keys or the numpad
const keypadZero = 48;
const numpadZero = 96;

//key codes for digits 0 - 9 into this filter
for(var i = 0; i <= 9; i++){
  filter.push(i + keypadZero);
  filter.push(i + numpadZero);
}

//add navigation keys for editing the text input
filter.push(8);     //backspace
filter.push(37);    //left arrow
filter.push(39);    //right arrow


//returns a string where all occurrences of a string 'search' are replaced with another
//string 'replace' in a string 'src'
function replaceAll(src,search,replace){

  return src.split(search).join(replace);
}

// returns a string that is in XXX-XXX-XXXX format
function formatPhoneText(value){
  value = this.replaceAll(value.trim(),"-","");
  if(value.length > 3 && value.length <= 6)
    value = value.slice(0,3) + "-" + value.slice(3);
  else if(value.length > 6)
    value = value.slice(0,3) + "-" + value.slice(3,6) + "-" + value.slice(6);

  return value;
}

// return true if the string 'p' is a valid phone
function validatePhone(p){
  var phoneRe = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var digits = p.replace(/\D/g, "");

  return phoneRe.test(digits);
}

// when a key is pressed down, check if it is allowed or not
// only numbers are allowed
function KeyPressed(e){
  if(filter.indexOf(e.keyCode) < 0){
    e.preventDefault();

    return false;
  }  
}

// record the contents in the input field, format in XXX-XXX-XXXX
// format and validate if the text is filled based on color of the border.
function KeyReleased(e){
  var input = e.target;
  var formatted = formatPhoneText(input.value);
  var isError = (validatePhone(formatted) || formatted.length == 0);
  var color =  (isError) ? "gray" : "red";
  var borderWidth =  (isError)? "1px" : "3px";
  input.style.borderColor = color;
  input.style.borderWidth = borderWidth;
  input.value = formatted;
}

// fields with the specified 'className' to work like phone number input fields
function setupPhoneFields(className){
  var lstPhoneFields = document.getElementsByClassName(className);
  for(var i=0; i < lstPhoneFields.length; i++){
    var input = lstPhoneFields[i];
    if(input.type.toLowerCase() == "text"){
      input.placeholder = "Enter a phone (XXX-XXX-XXXX)";
      input.addEventListener("keydown", KeyPressed);
      input.addEventListener("keyup", KeyReleased);
    }
  }
}

//Main method
setupPhoneFields("phoneNumber");
