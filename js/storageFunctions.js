/* Functions for the conditions */
// Function that adds a new condition to the storage. If an item exists with the same date: replace that item with the new one
function addConditionToStorage(newCondition) {
    let conditionList = getConditionsFromStorage();
    for(let i = 0; i < conditionList.length; i++) {
        if(compareTwoDates(conditionList[i].date, newCondition.date)) {
            conditionList[i] = newCondition;
            updateListInStorage(conditionList);
            return;
        }
    }
    conditionList.push(newCondition);
    updateListInStorage(conditionList);
}

function updateListInStorage(newList) {
    localStorage.setItem('conditions', JSON.stringify(newList));
}

function getConditionsFromStorage() {
    let conditionsInStorage = [];
    if(localStorage.getItem('conditions') != null) {
        conditionsString = localStorage.getItem('conditions');
        conditionsInStorage = JSON.parse(conditionsString);
        // Convert each date back into Date object
        for(let i = 0; i < conditionsInStorage.length; i++) {
            conditionsInStorage[i].date = new Date(conditionsInStorage[i].date);
        }
        return conditionsInStorage;
    } else {
        return [];
    }
}

/* Functions for the saved conditions in the dropdown list */

// Get all items for the dropdown list if it exists, otherwise return an empty list
function getDropdownItemsFromStorage() {
    let dropdownItems = [];
    if(localStorage.getItem('dropdownItems') != null) {
        itemString = localStorage.getItem('dropdownItems');
        dropdownItems = JSON.parse(itemString);
        return dropdownItems;
    } else {
        return [];
    }
}

function updateDropdownItems(newList) {
    localStorage.setItem('dropdownItems', JSON.stringify(newList));
}

function addNewItemToStorage(newItem) {
    let dropdownItems = getDropdownItemsFromStorage();
    for(let i = 0; i < dropdownItems.length; i++) {
        if(dropdownItems[i].description === newItem.description) {
            dropdownItems[i] = newItem;
            updateDropdownItems(dropdownItems);
            return;
        }
    }
    dropdownItems.push(newItem);
    updateDropdownItems(dropdownItems);
}
