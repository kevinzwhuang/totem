chrome.storage.sync.get({
  url: "",
  alert: "Totem detects a watched URL!"
}, function(items) {
  var pattern = require('match-pattern')
  var urlRegex = pattern.parse(items.url)
  if (urlRegex.test(document.URL)) {
    alert(items.alert)
  }
})
