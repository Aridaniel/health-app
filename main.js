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
        console.log('Today before change: ' + today);
        today = new Date(today.getFullYear(), today.getMonth() + 1);
        console.log('today after change: ' + today);
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
    const datesArray = document.querySelectorAll('.date');
    for(let i = 0; i < datesArray.length; i++) {
        datesArray[i].remove();
    }
}

// Pass in an array of date objects in a month and display them in the calendar
function displayMonthInCalendar(month) {
    clearCalendar();
    let firstDayIndex = month[0].getDay();
    let currentDay = 0;
    currentMonthElement.innerHTML = allMonths[month[0].getMonth()];
    currentYearElement.innerHTML = month[0].getFullYear();
    // Create 42 div elements (7 columns, 6 rows)
    for(let i = 0; i < 42; i++) {
        let dayElement = document.createElement('div');
        dayElement.classList.add('date');
        // If i is equal or greater then firstDayIndex we know we are positioned on the correct weekday and we can start marking the dates
        if(i >= firstDayIndex && currentDay < month.length) {
            dayElement.innerHTML = month[currentDay].getDate();
            // Incrementing currentDay to access the next day of the month array
            currentDay++;
        }
        calendarElement.appendChild(dayElement);
    }
}

// Initialize the calendar with today as the month to display
let daysInCurrentMonth = getDaysInMonth(today.getMonth(), today.getFullYear());
displayMonthInCalendar(daysInCurrentMonth);

// ToDo: 
// highlighta current day
// gera all daga clickable
// fela tóma reyti
// Stíla 