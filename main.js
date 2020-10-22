// All months in Icelandic to display in the calendar
const allMonths = ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'];

// DOM element variables
const calendarElement = document.getElementById('calendar');
const currentMonthElement = document.getElementById('current-month');
const currentYearElement = document.getElementById('current-year');
const prevMonthElement = document.getElementById('prev-month');
const nextMonthElement = document.getElementById('next-month');

// Initialize today as the date today
let today = new Date();

const newCondition = new Condition('Magaverkur', 'Entist í 3 tíma', new Date(2020, 8, 12), 'crimson');
const anotherCondition = new Condition('Höfuðverkur', 'Var allann daginn.', new Date(2020, 8, 19), 'green');
const thirdCondition = new Condition('Hálsbólga', 'Búið að vera í viku, fór til læknis.', new Date(2020, 9, 8), 'salmon');
const fourthCondition = new Condition('Svimi', 'Stóð yfir í 2 tíma', new Date(2020, 11, 8), 'purple');

const conditionList = [newCondition, anotherCondition, thirdCondition, fourthCondition];
let thisMonthsConditions = [];

// Add event listeners once the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    prevMonthElement.addEventListener('click', changeMonth);
    nextMonthElement.addEventListener('click', changeMonth);
});

// Call this each time the next or previous month button is clicked
function changeMonth(ev) {
    if(ev.currentTarget.id === 'prev-month') {
        today = new Date(today.getFullYear(), today.getMonth() - 1);
        let newMonth = getDaysInMonth(today.getMonth(), today.getFullYear());
        displayMonthInCalendar(newMonth);
    }
    if(ev.currentTarget.id === 'next-month') {
        today = new Date(today.getFullYear(), today.getMonth() + 1);
        let newMonth = getDaysInMonth(today.getMonth(), today.getFullYear());
        displayMonthInCalendar(newMonth);
    }
}

// Returns an array of every day in given month and year as date objects
function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
}

// Remove every element that has the .date class from the site
function clearCalendar() {
    const datesArray = document.querySelectorAll('.calendar-item');
    for(let i = 0; i < datesArray.length; i++) {
        datesArray[i].remove();
    }
}

// Pass in an array of date objects in a month and display them in the calendar
function displayMonthInCalendar(month) {
    clearCalendar();
    let highlightedDay = new Date();
    let firstDayIndex = month[0].getDay();
    let currentDay = 0;
    
    currentMonthElement.innerHTML = allMonths[month[0].getMonth()];
    currentYearElement.innerHTML = month[0].getFullYear();
    // Create 42 div elements (7 columns, 6 rows)
    for(let i = 0; i < 42; i++) {
        let dayElement = document.createElement('div');
        dayElement.classList.add('calendar-item');
        // If i is equal or greater then firstDayIndex we know we are positioned on the correct weekday and we can start marking the dates
        if(i >= firstDayIndex && currentDay < month.length) {
            dayElement.innerHTML = month[currentDay].getDate();
            dayElement.classList.add('calendar-date');  
            // Check if current day being inserted into the calendar is the same as the day today          
            if(compareTwoDates(month[currentDay], highlightedDay)) {
                dayElement.classList.add('current-day');
            }
            // Incrementing currentDay to access the next day of the month array
            currentDay++;
        } else {
            dayElement.classList.add('calendar-filler');
        }

        dayElement.addEventListener('click', handleDateClick);
        calendarElement.appendChild(dayElement);
    }
    loadConditionsToCalendar(conditionList);
}

// Goes through a list of conditions and checks if any conditions year and month in the list matches the currently shown year and month
// If it does, give the element a color and a data-date attribute
function loadConditionsToCalendar(conditions) {
    thisMonthsConditions = [];
    const currentYear = document.getElementById('current-year').innerHTML;
    const currentMonth = document.getElementById('current-month').innerHTML;
    let dateElements = document.querySelectorAll('.calendar-date');
    for(let i = 0; i < conditions.length; i++) {
        // If the current conditions year and month match the calendar year and month, give that element a different style
        // TODO: maybe change the way we access the correct dateElements element, currently we're using the condition date as index.
        if(conditions[i].date.getFullYear() === parseInt(currentYear) && allMonths[conditions[i].date.getMonth()] === currentMonth) {
            dateElements[conditions[i].date.getDate() - 1].style.backgroundColor = conditions[i].color;
            dateElements[conditions[i].date.getDate() - 1].setAttribute('data-date', conditions[i].date.getDate());
            thisMonthsConditions.push(conditions[i]);
        }
    }
}

// Used to compare two dates to each other and returns true if the year, month and date is the same
function compareTwoDates(date1, date2) {
    if(date1.getFullYear() + '-' + date1.getMonth() + '-' + date1.getDate() === date2.getFullYear() + '-' + date2.getMonth() + '-' + date2.getDate()) {
        return true;
    }
    return false;
}

function handleDateClick(ev) {
    // If the element has a data-date attribute do something
    if(ev.currentTarget.hasAttribute('data-date')) {
        const clickedDate = ev.currentTarget.getAttribute('data-date');
        const conditionName = getCondition(parseInt(clickedDate)).description;
        console.log(conditionName);
    }
}

// Currently working with 'thisMonthsConditions' array to retrieve correct condition
function getCondition(date) {
    return thisMonthsConditions.find(element => element.date.getDate() === date);
}

// Initialize the calendar with today as the month to display
let daysInCurrentMonth = getDaysInMonth(today.getMonth(), today.getFullYear());
displayMonthInCalendar(daysInCurrentMonth);
// ToDo: 
// Gera display glugga fyrir veikindin þegar klikkað er á þau, mögulega einhverskonar overlay?



// Animation fyrir dagatalið
// Ef við notum timout fyrir dagatalið þá þarf einhvernveginn að diseibla og reactiveita month takkana eftir animationið
// setTimeout(() => {
// }, 200 * (Math.pow(i, 0.6)));