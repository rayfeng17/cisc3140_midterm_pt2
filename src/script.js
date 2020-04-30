// create a textbox that allows keystrokes in the input field
var textbox = [];

// allows digits 0 - 9
// they can come from either the numeric keys or the numpad
const keypadZero = 48;
const numpadZero = 96;

//key codes for digits 0 - 9
for(var i = 0; i <= 9; i++){
  textbox.push(i + keypadZero);
  textbox.push(i + numpadZero);
}

//add navigation keys for editing the text input
textbox.push(8);     //backspace
textbox.push(37);    //left arrow
textbox.push(39);    //right arrow


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
  var phoneInput = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  var digits = p.replace(/\D/g, "");

  return phoneInput.test(digits);
}

// when a key is pressed, check if it is allowed or not
function keyPressed(e){
  if(textbox.indexOf(e.keyCode) < 0){
    e.preventDefault();

    return false;
  }  
}

// record the contents in the input field, format in XXX-XXX-XXXX
// validate if the text is filled based on color of the border
function keyReleased(e){
  var input = e.target;
  var formatted = formatPhoneText(input.value);
  var isError = (validatePhone(formatted) || formatted.length == 0);
  var color =  (isError) ? "gray" : "red";
  var borderWidth =  (isError)? "1px" : "3px";
  input.style.borderColor = color;
  input.style.borderWidth = borderWidth;
  input.value = formatted;
}

// field with the specified 'className' to work like phone number input fields
function setupPhoneField(className){
  var inPhoneField = document.getElementsByClassName(className);
  for(var i=0; i < inPhoneField.length; i++){
    var input = inPhoneField[i];
    if(input.type.toLowerCase() == "text"){
      input.placeholder = "Enter a phone (XXX-XXX-XXXX)";
      input.addEventListener("keydown", keyPressed);
      input.addEventListener("keyup", keyReleased);
    }
  }
}

//Main method
setupPhoneField("phoneNumber");
