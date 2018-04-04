let pages = 1;

function addPages() {
    //let lastpage = document.getElementById('last-page').offsetHeight-50;
    let pageTop =  document.getElementById('page-content').scrollTop;
    let hep = document.getElementById('content-new').offsetHeight;
    //console.log(pageTop+" = "+hep);
    //if((pageTop+(lastpage*2)) > hep){
    if(pageTop > hep){
        let node = document.createElement("div");
        let textnode = document.createTextNode("Added Page "+pages);
        node.appendChild(textnode);
        node.className = "add-page";
        document.getElementById("content-new").appendChild(node);
        pages++;
    }
}
function openPages(){
    document.getElementById("wrapContent").className = "wraps open";
    setTimeout(function () {
        window.location = "/webpractice";
    },1500);
}
let timeToScroll;
function scrollUp() {
    clearTimeout(timeToScroll);
    let to = 0;
    let element = document.getElementById('page-content');
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
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};