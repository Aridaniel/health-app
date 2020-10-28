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