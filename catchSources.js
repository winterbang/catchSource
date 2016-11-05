var sources = [],
  i = 0,
  bgIm;

function getStyle(x, styleProp) {
  if (x.currentStyle) var y = x.currentStyle[styleProp];
  else if (window.getComputedStyle) var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
  return y;
}

// Get all elements on the page
var elements = document.getElementsByTagName('*');

// iterate over the elements
for (; elements[i]; i++) {
  var source
  if (elements[i].nodeName == "IMG") {
    source = elements[i].getAttribute('src');
  } else {
    bgIm = getStyle(elements[i], 'background-image');
    if (bgIm && bgIm !== 'none') {
      bgIm = /url\(['"]?([^")]+)/.exec(bgIm) || [];
      source = bgIm[1]
    }
  }
  if (source && sources.indexOf(source) == -1) sources.push(source);
}

// view the console to see the result
console.log(sources);

// chrome.extension.sendRequest(sources);
