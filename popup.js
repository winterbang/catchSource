console.log('======');
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
