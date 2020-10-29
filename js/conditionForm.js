const logForm = document.getElementById('logForm');
const logLink = document.getElementById('log-condition');
const logButton = document.getElementById('log-button');
//const selectBox = document.getElementById('velja-lidan');
const selectButton = document.getElementById('select-condition');
const dropdownOptions = document.getElementById('dropdown-options');
const dateSelection = document.getElementById('log-date');
const addToDropDwnBtn = document.getElementById('addToDropDwnBtn');
const otherInfo = document.getElementById('annad');
const selectError = document.getElementById('select-error');
const successMessage = document.getElementById('mySuccessMessage');
const closeSuccess = document.getElementById('close-success');
let chosenStrength = null;


//let conditionsInStorage = [];

// Handle submit event
const handleSubmit = (e) => {
    // Hijack the submit event
    e.preventDefault();
    let success = true;
    const form = e.target,
    elements = form.elements;
    // Validate first the dropdown selection
    if(selectButton.innerHTML === 'Velja líðan') {
        selectError.innerHTML = "*Þú verður að velja líðan!";
        console.log('nothing picked'); 
        success = false;
    } else {
        selectError.innerHTML = '';
    }

    // Loop through elements in form      
    for (let i = 0, len = elements.length; i < len; i++) {
        const element = elements[i];
        
        let customErrorMessage = "";
        if (element.validity.valid !== true) {
            // Custom validation
          
            if (element.type === "date") {
                customErrorMessage = "*Þú verður að velja dagssetningu!"
                success = false;     
            }
            
            else if (element.name === "annad") {
                customErrorMessage = "*Þú verður að skrifa eitthvað"
                success = false;     
            }            
            // Create a new div next to relevant element and display the custom error message
            const message = customErrorMessage;
            parent = element.parentNode;
            div = document.createElement('div');
            div.appendChild(document.createTextNode(message));
            div.classList.add('validation-message');
            parent.insertBefore(div, element.nextSibling);
            element.focus();
            break;
        }
    }

    const conditionName = selectButton.innerHTML;
    const other = otherInfo.value;
    const conditionDate = new Date(dateSelection.value);
    const conditionIntensity = chosenStrength;
    const conditionColor = selectButton.getAttribute('data-color');
    const newCondition = new Condition(conditionName, other, conditionDate, conditionIntensity, conditionColor);
    //conditionsInStorage.push(newCondition);
    if (success) {
        console.log('Success!');
        console.log('pushed: ' + newCondition);
        addConditionToStorage(newCondition);
        //location.reload()
        logForm.reset();
        successMessage.style.display = "block";
    }
};

// Handle select change yrði öðruvísi
// When the selection element is changed, fetch the color that is bound to the currently selected option
function optionChosen(ev) {
    console.log('clicked');
    // Get the delete element
    const delButton = ev.currentTarget.lastChild;
    // If user didn't click the delete icon: proceed with option change
    if(!delButton.contains(ev.target)) {
        selectButton.style.backgroundColor = ev.currentTarget.getAttribute('data-color');
        selectButton.setAttribute('data-color', ev.currentTarget.getAttribute('data-color'));
        selectButton.innerHTML = ev.currentTarget.firstChild.innerHTML;
        toggleDropDown();
    } else {
        console.log('remove clicked');
    }
}

// Everytime the log page is opened reset certain things
function openLogPage(ev) {
    chosenStrength = null;
    hideDropdown();
    clearOptions();
    loadOptionsFromStorage();
    resetSelectButton();
    strengthArray.forEach(element => element.classList.remove('strength-active'));
    dateSelection.value = new Date().toISOString().split('T')[0];
}

function hideDropdown() {
    if(!dropdownOptions.classList.contains('hide-dropdown')) {
        dropdownOptions.classList.add('hide-dropdown');
    }
}

// Function that closes the success message window
function closeMessage() {
    successMessage.style.display = "none";
    openCalendar();
    /*location.href = "/#calendar-page";*/
};

// Event listener for submit event of all forms 
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    for (let i = forms.length - 1; i >= 0; i--) {
        const form = forms[i];
        form.noValidate = true;
        form.addEventListener('submit', handleSubmit);
    }
    //selectBox.addEventListener('change', handleSelectChange);
    selectButton.addEventListener('click', showDropDown);
    logLink.addEventListener('click', openLogPage);
    logButton.addEventListener('click', openLogPage);
    closeSuccess.addEventListener('click', closeMessage);
});

function showDropDown(ev) {
    toggleDropDown();
}

function toggleDropDown() {
    if(dropdownOptions.classList.contains('hide-dropdown')) {
        dropdownOptions.classList.remove('hide-dropdown');
    } else {
        dropdownOptions.classList.add('hide-dropdown');
    }
}

// Þyrfti að breyta þessu eftir hvernig dropdownið væri útfært
function clearOptions() {
    while(dropdownOptions.hasChildNodes()) {
        dropdownOptions.removeChild(dropdownOptions.lastChild);
    }
}

// Fill the condition options with the names of all unique conditions
function loadOptionsFromStorage() {
    // Get all the dropdown items from storage
    let allOptions = getDropdownItemsFromStorage();
    
    if(allOptions.length > 0) {

        // Create an option for each dropdown item
        for(let i = 0; i < allOptions.length; i++) {
            const newOption = document.createElement('div');
            const optionDescr = document.createElement('div');
            const delButton = document.createElement('div');
            optionDescr.innerHTML = allOptions[i].description;
            delButton.innerHTML = 'X';
            delButton.addEventListener('click', deleteItem);
            newOption.setAttribute('data-color', allOptions[i].color);
            //newOption.setAttribute('data-date', allConditions[i].date);
            newOption.classList.add('dropdown-item');
            newOption.style.backgroundColor = allOptions[i].color;
            newOption.addEventListener('click', optionChosen);
            newOption.appendChild(optionDescr);
            newOption.appendChild(delButton);
            //selectBox.appendChild(newOption);
            dropdownOptions.appendChild(newOption);
        }
    }
}

// Function for when the delete icon is clicked
function deleteItem(ev) {
    console.log('deleting');
    // First get the whole dropdown item list
    let allOptions = getDropdownItemsFromStorage();
    const itemName = ev.currentTarget.parentNode.firstChild.innerHTML;
    for(let i = 0; i < allOptions.length; i++) {
        if(allOptions[i].description === itemName) {
            allOptions.splice(i, 1);
        }
    }
    updateDropdownItems(allOptions);
    clearOptions();
    loadOptionsFromStorage(allOptions);
    resetSelectButton();
}

function resetSelectButton() {
    selectButton.innerHTML = 'Velja líðan';
    selectButton.setAttribute('data-color', '');
    selectButton.style.removeProperty('background-color');
}

// Add option væri eins nema input valitidy væri öðruvísi og önnur element yrðu búin til...
// Add new option to dropdown list and validate modal input
function addOption() {
    const newOption = document.createElement('div');
    const optionDescr = document.createElement('div');
    const delButton = document.createElement('div');
    const inputValue = document.querySelector('#addInput').value;
    const inputElement = document.querySelector('#addInput');
    
    //newOption.setAttribute('data-color', colorPicked);
    let activeColor = document.querySelector('.activeColor');
    let chosenColor = activeColor.style.backgroundColor;
    
    // If the modal input is valid the new option will be added to the dropdown and the modal disappear
    if ( inputElement.validity.valid === true ) {
        // If no color is chosen
        if(chosenColor === '') {
            chosenColor = '#ffffff';
        }
        //console.log('Assigning color: ' + chosenColor);
        // Add a data-color attribute to each option to know what color each condition should be
        newOption.setAttribute('data-color', chosenColor);
        newOption.classList.add('dropdown-item');

        optionDescr.innerHTML = inputValue;
        delButton.innerHTML = 'X';
        newOption.style.backgroundColor = chosenColor;
        newOption.addEventListener('click', optionChosen);
        //selectBox.appendChild(newOption);
        newOption.appendChild(optionDescr);
        newOption.appendChild(delButton);
        dropdownOptions.appendChild(newOption);
        // Add the item to saved condition list
        const newItem = new SavedCondition(inputValue, chosenColor);
        addNewItemToStorage(newItem);
        // Refresh dropdown list
        clearOptions();
        loadOptionsFromStorage();
        selectButton.style.backgroundColor = chosenColor;
        selectButton.setAttribute('data-color', chosenColor);
        selectButton.innerHTML = inputValue;
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

window.onmousedown = function(event) {
    // Hide dropdown options when clicked outside
    if (dropdownOptions.contains(event.target) || selectButton.contains(event.target)){
        // Clicked in box or the button
    } else{
        // Clicked outside the box
        hideDropdown();
    }
}

/* Strength picker */

// Three strengths from html
const strengthOne = document.getElementById('strength-one');
const strengthTwo = document.getElementById('strength-two');
const strengthThree = document.getElementById('strength-three');


let strengthArray = [strengthOne, strengthTwo, strengthThree];

// when clicking adding and removing color by index
strengthArray.forEach(function (element, index) {
    element.addEventListener('click', function() {
        for (let i = 0; i < strengthArray.length; i++) {
            if (i <= index) {
                // adding background color
                strengthArray[i].classList.add('strength-active');
            } else {
                // removing background color
                strengthArray[i].classList.remove('strength-active');
            }
        }
        // loop yfir strength array og lita aalla minn eða jafnt og index valinn
        chosenStrength = index;
    })
});