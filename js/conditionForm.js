const logForm = document.getElementById('logForm');
const logLink = document.getElementById('log-condition');
const logButton = document.getElementById('log-button');
const selectBox = document.getElementById('velja-lidan');
const dateSelection = document.getElementById('log-date');
const addToDropDwnBtn = document.getElementById('addToDropDwnBtn');
const otherInfo = document.getElementById('annad');
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
    // Loop through elements in form       
    for (let i = 0, len = elements.length; i < len; i++) {
        const element = elements[i];
        
        let customErrorMessage = "";
        if (element.validity.valid !== true) {
            // Custom validation
            if ( element.name === "velja-lidan") {
                customErrorMessage = "*Þú verður að velja líðan"  
                success = false;
            }
          
            else if (element.type === "date") {
                customErrorMessage = "*Þú verður að velja dagssetningu"
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

    const conditionName = selectBox.value;
    const other = otherInfo.value;
    const conditionDate = dateSelection.value;
    const conditionIntensity = chosenStrength;
    const conditionColor = selectBox.getAttribute('data-color');
    const newCondition = new Condition(conditionName, other, conditionDate, conditionIntensity, conditionColor);
    //conditionsInStorage.push(newCondition);
    if (success) {
        console.log('Success!');
        updateConditionsInStorage(newCondition);
        //location.reload()
        logForm.reset();
        successMessage.style.display = "block";
    }
};



function closeMessage() {
    successMessage.style.display = "none";
    
    /*location.href = "/#calendar-page";*/
};

// When the selection element is changed, fetch the color that is bound to the currently selected option
function handleSelectChange(ev) {
    // þetta er ekkert ruglandi ég veit...
    ev.currentTarget.setAttribute('data-color', ev.currentTarget.item(ev.currentTarget.selectedIndex).getAttribute('data-color'));
    //ev.currentTarget.style.backgroundColor = ev.currentTarget.getAttribute('data-color'); // Breytir öllum options líka...
}

function openLogPage(ev) {
    chosenStrength = null;
    clearOptions();
    loadOptionsFromStorage();
}

// Event listener for submit event of all forms 
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    for (let i = forms.length - 1; i >= 0; i--) {
        const form = forms[i];
        form.noValidate = true;
        form.addEventListener('submit', handleSubmit);
    }
    selectBox.addEventListener('change', handleSelectChange);
    logLink.addEventListener('click', openLogPage);
    logButton.addEventListener('click', openLogPage);
    closeSuccess.addEventListener('click', closeMessage);
});

function clearOptions() {
    let elements = document.querySelectorAll('option');
    for(let i = 0; i < elements.length; i++) {
        if (elements[i].hasAttribute('data-color')) {
            elements[i].remove();
        }
    }
}

// Fill the condition options with the names of all unique conditions
function loadOptionsFromStorage() {
    let allConditions = getConditionsFromStorage();
    let uniqueConditions = [];
    
    if(allConditions.length > 0) {
        // Generate a unique array to fill the dropdown with
        for(let x = 0; x < allConditions.length; x++) {
            if(uniqueConditions.length > 0) {
                // If the find method finds the current description in the unique array, don't add it to the array
                if(uniqueConditions.find(element => element.description === allConditions[x].description) === undefined) {
                    uniqueConditions.push(allConditions[x]);
                }
            } else {
                uniqueConditions.push(allConditions[x]);                
            }
        }

        // Create an option for each unique condition
        for(let i = 0; i < uniqueConditions.length; i++) {
            const newOption = document.createElement('option');
            const optionText = document.createTextNode(uniqueConditions[i].description);
            newOption.setAttribute('data-color', uniqueConditions[i].color);
            newOption.value = uniqueConditions[i].description;
            newOption.style.backgroundColor = uniqueConditions[i].color;
            newOption.appendChild(optionText);
            selectBox.appendChild(newOption);
        }
    }
}

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
        // If no color is chosen
        if(chosenColor === '') {
            chosenColor = '#ffffff';
        }
        //console.log('Assigning color: ' + chosenColor);
        // Add a data-color attribute to each option to know what color each condition should be
        newOption.setAttribute('data-color', chosenColor);
        selectBox.setAttribute('data-color', chosenColor);
        newOption.setAttribute('selected', 'selected');
        newOption.value = inputValue;
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
        console.log('Strength = ' + index);
        chosenStrength = index;
    })
});