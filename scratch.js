var allScripts = document.body.querySelectorAll('script');
console.log(allScripts.length);
if (allScripts.length > 4) {
    allScripts.forEach(function(script, index){ if (index > 3 && index < allScripts.length){document.body.removeChild(script)} })
}
var scrollDOM = document.querySelector('.scrolls');
var allPics = document.querySelectorAll('.scroll-pic');
scrollDOM.innerHTML = "";
allPics.forEach(function(pic){ scrollDOM.appendChild(pic) });


