function updateConditionsInStorage(newCondition) {
    let conditionList = getConditionsFromStorage();
    conditionList.push(newCondition);
    localStorage.setItem('conditions', JSON.stringify(conditionList));
}

function getConditionsFromStorage() {
    let conditionsInStorage = [];
    if(localStorage.getItem('conditions') != null) {
        conditionsString = localStorage.getItem('conditions');
        conditionsInStorage = JSON.parse(conditionsString);
        for(let i = 0; i < conditionsInStorage.length; i++) {
            conditionsInStorage[i].date = new Date(conditionsInStorage[i].date);
        }
        return conditionsInStorage;
    } else {
        return [];
    }
}