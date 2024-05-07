
//Set active Element in SideBar
let sectionElement = document.querySelectorAll(".section-item");
let activeSectionElement ;

sectionElement.forEach(function(item,index){
    item.addEventListener("click", function(){
        activeSectionElement = document.querySelector(".active-section");
        activeSectionElement.classList.remove("active-section");
        activeSectionElement.classList.add("unactive-section");
        item.classList.remove("unactive-section");
        item.classList.add("active-section");
    }
);})

//Set active Element in Task List
let daysElement =  document.querySelectorAll(".content_tasklist_weekday_item");
let daysElementArray = [...daysElement];
let activeDayElement ;
let widthElement = document.querySelector(".content_tasklist_weekday_item").offsetWidth;
let bgElement = document.querySelector(".bg-animation");
let arrowMovingdays = document.querySelector(".content_tasklist_arrow");
function setClassName(e) {
    e.childNodes.forEach(function(key){
        if(key.nodeName == "DIV") key.classList.add("curday");
    })
    return e;
}
function unsetClassName(e) {
    e.childNodes.forEach(function(key){
        if(key.nodeName == "DIV") key.classList.remove("curday");
    })
}
function toLeftActiveDay() {
    //Monday
    if(activeDayElement == activeDayElement.parentElement.firstElementChild ) {
        unsetClassName(activeDayElement);
        activeDayElement = setClassName(activeDayElement.parentElement.lastElementChild.previousElementSibling);
        bgElement.style.left = `${widthElement*6}px`
        }
    //Other Days
    else {
        unsetClassName(activeDayElement);
        activeDayElement = setClassName(activeDayElement.previousElementSibling);
        bgElement.style.left = `${widthElement*(daysElementArray.indexOf(activeDayElement))}px`;
    }

}


function toRightActiveDay() {
    //Sunday
    if(activeDayElement == activeDayElement.parentElement.lastElementChild.previousElementSibling ) {
        unsetClassName(activeDayElement);
        activeDayElement = setClassName(activeDayElement.parentElement.firstElementChild);
        bgElement.style.left = `${widthElement*0}px`
    }
    //Other Days
    else {
        unsetClassName(activeDayElement);
        activeDayElement = setClassName(activeDayElement.nextElementSibling);
        bgElement.style.left = `${widthElement*(daysElementArray.indexOf(activeDayElement))}px`;
    }
}

if(d.getDay == 0){
    activeDayElement = setClassName(daysElement[6]);
    bgElement.style.left = `${widthElement*6}px`
}    
else {
    activeDayElement = setClassName(daysElement[d.getDay()-1]);
    bgElement.style.left = `${widthElement*(d.getDay()-1)}px`

}
daysElement.forEach(function(key,index) {
    key.addEventListener("click",function(){
        unsetClassName(activeDayElement);
        setClassName(key);
        activeDayElement = key;
        bgElement.style.left = `${widthElement*index}px`
    })
})
arrowMovingdays.childNodes.forEach(function(key){
    key.addEventListener("click",function(){
        //Arrow left
        if(key.classList.contains("fa-circle-chevron-left")) toLeftActiveDay();
        //Arrow right
        else toRightActiveDay();
    })
})


//Calender
let activeMonthAndYear = d;
let navtimeElement = document.querySelector(".calendar_navtime");
const itemCalenderElement = document.querySelectorAll(".app_performance_calendar_table_col");
let dateToSetCalender ;

updateMonthAndYear();
updateCalender();

function toRightCalendar(activeMonthAndYear) {
    return activeMonthAndYear.setMonth(activeMonthAndYear.getMonth()+1)
}

function toLeftCalendar(activeMonthAndYear) {
    return activeMonthAndYear.setMonth(activeMonthAndYear.getMonth()+1)
}

function updateMonthAndYear() {
    navtimeElement.textContent = `${month[activeMonthAndYear.getMonth()]} ${activeMonthAndYear.getFullYear()}`
}
document.querySelector(".app_performance_calendar_navtime").childNodes.forEach(function(key){
    key.addEventListener("click",function(){
        if(key.nodeName == "I") {
            if(key.classList.contains("fa-circle-chevron-left")) {
                activeMonthAndYear.setMonth(activeMonthAndYear.getMonth() - 1);
                updateMonthAndYear();
                updateCalender();
            }
            else {
                activeMonthAndYear.setMonth(activeMonthAndYear.getMonth() + 1);
                updateMonthAndYear();
                updateCalender();
            }
            
        }
    })
   
})

//Set Date Calender
function getFirstDateOfMondayInCalender(year,month){
    let dayofmonday =  new Date(year,month,1);
    dayofmonday.setDate(dayofmonday.getDate()-dayofmonday.getDay()+1);
    return dayofmonday;
}
function updateCalender(){
    dateToSetCalender = getFirstDateOfMondayInCalender(activeMonthAndYear.getFullYear(),activeMonthAndYear.getMonth());
    itemCalenderElement.forEach(function(key,index){
        dateToSetCalender.setDate(dateToSetCalender.getDate()+index);
        key.textContent = dateToSetCalender.getDate() < 10 ? `0${dateToSetCalender.getDate()}` : dateToSetCalender.getDate();
        if(dateToSetCalender.getMonth() != activeMonthAndYear.getMonth()) key.style.color = "var(--un-active-color)";
        dateToSetCalender.setDate(dateToSetCalender.getDate()-index);
    })
}


