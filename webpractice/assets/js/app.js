let slides = document.getElementById('slides');
let currentSlide = 0;
let totalSlide = 3;
let timeSlide = 5000;
let slideInterval = setInterval(nextSlide, timeSlide);
let playing =true;
let scrollInterval;
function nextSlide(){
    goToSlide(currentSlide+1);
}
function goToSlidePause(n) {
    stopSlide();
    document.getElementById('nav-slide').className = "pause";
    goToSlide(n);
}
function goToSlide(n){
    for(let i=0;i < 3;i++){
        document.getElementById('s'+i.toString()).className = "number-slide";
    }
    currentSlide = (n+totalSlide)%totalSlide;
    slides.className = 'slides show'+currentSlide.toString();
    document.getElementById('s'+currentSlide.toString()).className = "number-slide selected";
    let navClass = document.getElementById('nav1');
    if(navClass.className == 'selected'){
        navClass.className = 'selected s'+(currentSlide+1).toString();
    }else{
        navClass.className = 's'+(currentSlide+1).toString();
    }
}
function stopSlide() {
    clearInterval(slideInterval);
    playing =false;
    document.getElementById("nav-slide").innerHTML = "Pause";
    document.getElementById('nav-slide').className = "pause";

}
function startSlide() {
    slideInterval = setInterval(nextSlide,timeSlide);
    playing =true;
    document.getElementById("nav-slide").innerHTML = "Play";
    document.getElementById('nav-slide').className = "";

}
function playOrPause() {
    if(playing){
        stopSlide();
    }else{
        startSlide();
    }
}
function clickNavigasi(id) {
    if(id>1){
        for(let i=2;i < 5;i++){
            document.getElementById('nav'+i.toString()).className = "";
        }
        document.getElementById('nav'+id.toString()).className = "selected";
    }else{
        for(let i=2;i < 5;i++){
            document.getElementById('nav'+i.toString()).className = "";
        }
    }
    hideMenu();
}
let timeToScroll;
function scrollToPage(id) {
    clearTimeout(timeToScroll);
    let to = document.getElementById(id).offsetTop;
    let element = document.getElementById('contents');
    let start = element.scrollTop;
    let change = to - start;
    let currentTime = 0;
    let increment = 50;
    let duration = 100;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        duration = 1000
    }
    let animateScroll = function(){
        currentTime += increment;
        let totalValue = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = totalValue;
        if(currentTime < duration) {
            timeToScroll = setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}
//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
function setTabs() {
    let bar = 45;//(window.innerHeight*(50/100))
    let contentsTop =  document.getElementById('contents').scrollTop;
    let tab1Top = document.getElementById('page1').offsetTop - bar;
    let tab2Top = document.getElementById('page2').offsetTop - bar;
    let tab3Top = document.getElementById('page3').offsetTop - bar;
    let footer = document.getElementById('footer').offsetTop - (window.innerHeight+bar);
    console.log(contentsTop);
    if(contentsTop < tab1Top){
        clickNavigasi(1);
        document.getElementById('contents').className = "scrolling-box bg0";
        window.history.pushState("home", "Web Practice - Yudha", "#home");
        document.title = "Web Practice - Yudha";
    }else if(contentsTop < tab2Top){
        clickNavigasi(2);
        document.getElementById('contents').className = "scrolling-box bg1";
        window.history.pushState("page1", "Page 1 | Web Practice - Yudha", "#page1");
        document.title = "Page 1 | Web Practice - Yudha";
    }else if(contentsTop < tab3Top){
        clickNavigasi(3);
        document.getElementById('contents').className = "scrolling-box bg2";
        window.history.pushState("page2", "Page 2 | Web Practice - Yudha", "#page2");
        document.title = "Page 2 | Web Practice - Yudha";
    }else if(contentsTop < footer){
        clickNavigasi(4);
        document.getElementById('contents').className = "scrolling-box bg3";
        window.history.pushState("page3", "Page 3 | Web Practice - Yudha", "#page3");
        document.title = "Page 3 | Web Practice - Yudha";
    }else{
        clickNavigasi(0);
        window.history.pushState("footer", "Footer | Web Practice - Yudha", "#footer");
        document.title = "Web Practice - Yudha";
    }
}
let menuStatus = false;
function showHideMenu(){
    if(menuStatus){
        hideMenu();
    }else{
        showMenu();
    }
    console.log(menuStatus);
}
function showMenu(){
    document.getElementById('menu').className = "menuContent show";
    menuStatus = true;
}
function hideMenu(){
    document.getElementById('menu').className = "menuContent";
    menuStatus = false;
}
window.onresize = () => {
    setTabs()
};
let xmlhttp = new XMLHttpRequest();
let url = "/webpractice/data/json-file.txt";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let jsonArray = JSON.parse(this.responseText);
        drawJson(jsonArray);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function drawJson(jsonArray) {
    let out = '<div class="json-container">';
    let i;
    for(i = 0; i < jsonArray.length; i++) {
        out += '<div><a href="' + jsonArray[i].url + '">' + jsonArray[i].title + '</a></div>';
    }
    out += '</div>';
    document.getElementById("page1").innerHTML = out;
}
function closeLeft() {
    hideMenu();
    document.getElementById("wrapContent").className = "wraps close";
    setTimeout(function () {
        window.location = "/webpractice/endless-scrolling.html";
    },1500)
}