console.log('======');
var sourcesList = [];
function showImage(urls) {
  let imgList = document.querySelector('.img-list')
  let imgsDom = urls.map(function(url, idx){
    let li = document.createElement('li')
    li.className = "img-item"

    let checkbox = document.createElement('input')
    checkbox.type = "checkbox"
    checkbox.className = "btn-checkbox"

    let img = document.createElement('img')
    img.src = url

    let footer = document.createElement('footer')
    let button = document.createElement('button')
    button.className = "btn-download"
    button.innerText = "下载"
    button.onclick = function() {
      chrome.downloads.download({
        url: url},
        function(id) {}
      );
    }
    let span = document.createElement('span')
    span.innerText = `${img.width}X${img.height}`
    footer.appendChild(button)
    footer.appendChild(span)
    li.appendChild(checkbox)
    li.appendChild(img)
    li.appendChild(footer)
    imgList.appendChild(li)
    return li
  })
  console.log(imgsDom);
  // document.querySelector('#imgs').append(imgsDom)
}
chrome.extension.onRequest.addListener(function(sources) {
  for (var index in sources) {
    sourcesList.push(sources[index]);
  }
  // sourcesList.sort();
  // visibleLinks = allLinks;
  showImage(sourcesList)
});
window.onload = function() {
  // document.getElementById('filter').onkeyup = filterLinks;
  // document.getElementById('regex').onchange = filterLinks;
  // document.getElementById('toggle_all').onchange = toggleAll;
  // document.getElementById('download0').onclick = downloadCheckedLinks;
  // document.getElementById('download1').onclick = downloadCheckedLinks;
  //
  chrome.windows.getCurrent(function(currentWindow) {
    chrome.tabs.query({
        active: true,
        windowId: currentWindow.id
      },
      function(activeTabs) {
        chrome.tabs.executeScript(
          activeTabs[0].id, {
            file: 'catchSources.js',
            allFrames: true
          });
      });
  });
};
// chrome.devtools.network.onRequestFinished.addListener(
//   function(request) {
//     console.log(request.response);
//     if (request.response.bodySize > 40 * 1024)
//       chrome.experimental.devtools.console.addMessage(
//         chrome.experimental.devtools.console.Severity.Warning,
//         "Large image: " + request.request.url);
//   });
