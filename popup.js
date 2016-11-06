let sourcesList = [];
let imgList = document.querySelector('.img-list');
let downloadUrls = []

function showImage(urls) {
  let imgsDom = urls.map(function(url, idx) {
      let li = document.createElement('li')
      li.className = "img-item"

      let checkbox = document.createElement('input')
      checkbox.type = "checkbox"
      checkbox.className = "btn-checkbox"
      checkbox.name = "img-check"
      checkbox.onclick = function taggle(e) {
        if (e.target.checked) {
          downloadUrls.push(url)
        } else {
          let idx = downloadUrls.indexOf(url)
          if (idx > -1) downloadUrls.splice(idx, 1);
        }
      }
      let img = document.createElement('img')
      img.src = url
      img.onload = function() {
        this.nextSibling.querySelector('.size').innerText = `${img.width}*${img.height}`
      }
      let footer = document.createElement('footer')
      let button = document.createElement('button')
      button.className = "btn-download"
      button.innerText = "下载"
      button.onclick = function() {
        chrome.downloads.download({
            url: url
          },
          function(id) {}
        );
      }

      let span = document.createElement('span')
      span.className = "size"
      span.innerText = `${img.width}*${img.height}`
      footer.appendChild(button)
      footer.appendChild(span)
      li.appendChild(checkbox)
      li.appendChild(img)
      li.appendChild(footer)
      imgList.appendChild(li)
      return li
    })
    // document.querySelector('#imgs').append(imgsDom)
  document.querySelector('.imgs-count').innerText = `总共${urls.length}张图片`
}

function onCheckMore(e) {
  if (e.target.checked) {
    imgList.className += " checkmore"
    e.target.parentElement.nextElementSibling.disabled = false
  } else {
    imgList.classList.remove("checkmore")
    e.target.parentElement.nextElementSibling.disabled = true
    let chk_arr = document.querySelectorAll('input[name=img-check]:checked')
    chk_arr.forEach(function(item, idx) {
      item.checked = false
    })
    downloadUrls = []
  }
}

function downloadCheckedLinks() {
  for (var i = 0; i < downloadUrls.length; ++i) {
    chrome.downloads.download({
        url: downloadUrls[i]
      },
      function(id) {});
  }
  // window.close();
}

chrome.extension.onRequest.addListener(function(sources) {
  for (var index in sources) {
    sourcesList.push(sources[index]);
  }
  // sourcesList.sort();
  showImage(sourcesList)
});
window.onload = function() {
  document.getElementById('btn-checkmore').onclick = onCheckMore;
  document.getElementById('download-more').onclick = downloadCheckedLinks;
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
