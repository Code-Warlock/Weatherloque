if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
const runFunc = ()=> {
    document.querySelectorAll('img.svg').forEach(img=>{
        var imgID = img.id;
        var imgClass = img.className;
        var imgURL = img.src;
      
        fetch(imgURL).then(response=> {
            return response.text();
        }).then(text=>{
      
            var parser = new DOMParser(); 
            var xmlDoc = parser.parseFromString(text, "text/xml");
      
            // Get the SVG tag, ignore the rest
            var svg = xmlDoc.querySelector('svg');
      
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                svg.setAttribute('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                svg.setAttribute('class', imgClass+' replaced-svg ' + time);
            }
            svg.removeAttribute('xmlns:a');
      
            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
                svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
            }
      
            // Replace image with new SVG
            img.parentNode.replaceChild(svg, img);
      
        });
      
      });
}

window.addEventListener('DOMContentLoaded', runFunc);