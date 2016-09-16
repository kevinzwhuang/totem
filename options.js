function save_options() {
  var url = document.getElementById('url').value;
  var alert = document.getElementById('alert').value;
  chrome.storage.sync.set({
    url: url,
    alert: alert
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    url: "",
    alert: "Totem detects a watched URL!"
  }, function(items) {
    document.getElementById('url').value = items.url;
    document.getElementById('alert').value = items.alert;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
