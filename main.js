console.log("helo");

function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
}

const calendarElement = document.getElementById('calendar');
let daysInSeptember = getDaysInMonth(3, 2020);

function displayMonthInCalendar(month) {
    let currentDay = 0;
    for(let i = 0; i < 35; i++) {
        let dayElement = document.createElement('div');
        if(i >= month[currentDay].getDay()) {
            dayElement.innerHTML = month[currentDay].getDate();
            currentDay++;
        }
        calendarElement.appendChild(dayElement);
    }
}

console.log(daysInSeptember[0].getDay());

displayMonthInCalendar(daysInSeptember);