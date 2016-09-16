chrome.storage.sync.get({
  url: "",
  alert: "Totem detects a watched URL!"
}, function(items) {
  if(items.url && items.url === document.URL) {
    alert(items.alert)
  }
})
