// Class to store the condition info the user want's to save in the calendar
class Condition {
    constructor(descr, otherInfo, date, intensity, col) {
        this.description = descr;
        this.other = otherInfo;
        this.date = date;
        this.intensity = intensity;
        this.color = col;
    }
}