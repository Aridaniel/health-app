const selectBox = document.getElementById('velja-lidan');
const addToDropDwnBtn = document.getElementById('addToDropDwnBtn');


// Handle submit event
const handleSubmit = (e) => {
    // Hijack the submit event
    e.preventDefault();
    let success = true;
    const form = e.target,
        elements = form.elements;
    // Loop through elements in form       
    for (let i = 0, len = elements.length; i < len; i++) {
        const element = elements[i];
        
        let customErrorMessage = "";
        if (element.validity.valid !== true) {
            // Custom validation
            if ( element.name === "velja-lidan") {
                customErrorMessage = "*Þú verður að velja líðan!"  
                success = false;                      
            }
          
            else if (element.type === "date") {
                customErrorMessage = "*Þú verður að velja dagssetningu!"
                success = false;     
            }
            
            else if (element.name === "annad") {
                customErrorMessage = "*Þú verður að skrifa eitthvað!"
                success = false;     
            } 

            
            // Create a new div next to relevant element and display the custom error message
            const message = customErrorMessage;
                parent = element.parentNode,
                div = document.createElement('div');
            div.appendChild(document.createTextNode(message));
            div.classList.add('validation-message');
            parent.insertBefore(div, element.nextSibling);
            element.focus();
            break;
        } 
    } 
    if (success) {
        alert('Success');
        location.reload();
    }
};

// Event listener for submit event of all forms 
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  for (let i = forms.length - 1; i >= 0; i--) {
    const form = forms[i];
    form.noValidate = true;
    form.addEventListener('submit', handleSubmit);
  }
});


// Add new option to dropdown list and validate modal input
function addOption() {
    const newOption = document.createElement('option');
    const inputValue = document.querySelector('#addInput').value;
    const inputElement = document.querySelector('#addInput');
    //newOption.setAttribute('data-color', colorPicked);
    let chosenColor = outputColor.style.backgroundColor;
    
    // If the modal input is valid the new option will be added to the dropdown and the modal disappear
    if ( inputElement.validity.valid === true ) {
        const optionText = document.createTextNode(inputValue);
        if(chosenColor === '') {
            chosenColor = '#ffffff';
        }
        console.log('Assigning color: ' + chosenColor);
        newOption.setAttribute('data-color', chosenColor);
        newOption.style.backgroundColor = chosenColor;
        newOption.appendChild(optionText);
        selectBox.appendChild(newOption);
        inputElement.value = '';
        addModal.style.display = "none";
    } else {
        // Create a new div next to relevant element and display the custom error message
        const message = "*Þú verður að skrifa eitthvað!"
            parent = inputElement.parentNode,
            div = document.createElement('div');
        div.appendChild(document.createTextNode(message));
        div.classList.add('validation-message');
        parent.insertBefore(div, inputElement.nextSibling);
        inputElement.focus(); 
    }
};
// Add an click event to button and call the addOption function
addToDropDwnBtn.addEventListener('click', addOption);


// Create add modal
const addModal = document.getElementById("myAddModal");
const openModuleBtn = document.getElementById("openAddModuleBtn");
const span = document.getElementsByClassName("close-modal")[0];

// Click on "Bæta við líðan" button and open add modal
openModuleBtn.onclick = function() {
    addModal.style.display = "block";
}

// Click on <span> x and close the modal
span.onclick = function() {
addModal.style.display = "none";
}

// Click anywhere outside modal and close it
window.onclick = function(event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    }
}