//Set currunt date in taskinfo
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
const curDate = {
    weekday : days[d.getDay()],
    monthday : d.getDate(),
    month : month[d.getMonth()],
    year : d.getFullYear(),
}
let dayElement = {
    weekday : document.querySelector(".curtime-weekday"),
    monthday : document.querySelector(".curtime-day"),
    month : document.querySelector(".curtime-month"),
    year : document.querySelector(".curtime-year"),
}

function getDatePrefix() {
    if(d.getDate() == 1 || d.getDate() == 21 || d.getDate() == 3  ) return "st";
    else if(d.getDate() == 2 || d.getDate() == 22 ) return "nd";
    else if(d.getDate() == 3 || d.getDate() == 23 ) return "rd";
    else return "th";
}
for(let key in dayElement) {
    if(key == "monthday")  
        dayElement[key].textContent = `${curDate[key]}${getDatePrefix()}`;
    else dayElement[key].textContent = curDate[key];
}

//Set date in Task List
let dayElementInTaskList;
let dayInTaskList = getDateOfMonday();

function getDateOfMonday() {
    let dayofmonday = new Date();
    dayofmonday.setDate(dayofmonday.getDate()-dayofmonday.getDay()+1);
    return dayofmonday;
}

for(let i = 0; i<7 ; i++ ) {
    dayElementInTaskList = `.dayof-${days[i].slice(0,3).toLowerCase()}`
    if(i==0) {
        let dateofsunday = getDateOfMonday();
        dateofsunday.setDate(dateofsunday.getDate()+6);
        document.querySelector(dayElementInTaskList).textContent = dateofsunday.getDate();
    }
    else {
        dayInTaskList.setDate(dayInTaskList.getDate()+i-1);
        document.querySelector(dayElementInTaskList).textContent = dayInTaskList.getDate();
        dayInTaskList.setDate(dayInTaskList.getDate()-i+1);
    }
}















