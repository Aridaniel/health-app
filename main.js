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
                dayElement.classList.remove('date');
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
}

// Used to compare two dates to each other and returns true if the year, month and date is the same
function compareTwoDates(date1, date2) {
    if(date1.getFullYear() + '-' + date1.getMonth() + '-' + date1.getDate() === date2.getFullYear() + '-' + date2.getMonth() + '-' + date2.getDate()) {
        return true;
    }
    return false;
}

function handleDateClick(ev) {
    console.log('Date clicked ' + ev.currentTarget.innerHTML);
}

// Initialize the calendar with today as the month to display
let daysInCurrentMonth = getDaysInMonth(today.getMonth(), today.getFullYear());
displayMonthInCalendar(daysInCurrentMonth);

// ToDo: 
// gera alla daga clickable
// Stíla 


// Animation fyrir dagatalið
// Ef við notum timout fyrir dagatalið þá þarf einhvernveginn að diseibla og reactiveita month takkana eftir animationið
// setTimeout(() => {
// }, 200 * (Math.pow(i, 0.6)));