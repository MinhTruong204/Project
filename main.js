let sectionElement = document.querySelectorAll(".section-item");
let activeSectionElement ;

sectionElement.forEach(function(item,index){
    item.addEventListener("click", function(){
        activeSectionElement = document.querySelector(".active-section");
        activeSectionElement.classList.remove("active-section");
        activeSectionElement.classList.add("unactive-section");
        item.classList.remove("unactive-section")
        item.classList.add("active-section");
    }
);})


