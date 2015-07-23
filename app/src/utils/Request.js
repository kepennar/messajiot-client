import Promise from 'bluebird';

function get(params) {
  function onLoad(resp) {
    var request = resp.srcElement || resp.originalTarget;
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data;
      if (params.contentType === 'application/json') {
        data = JSON.parse(request.responseText);
      } else {
        data = request.responseText;
      }
      return data;
    }
  }
  function onError(e) {
    return e;
  }

  var promise = new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.addEventListener('error', reject);
    request.addEventListener('load', resolve);
    request.open('GET', params.url, true);
    request.setRequestHeader('Accept', params.contentType);
    request.send(null);
  });
  return promise
  .then(onLoad)
  .catch(onError);
}
function post(params) {
  function onLoad(resp) {
    var request = resp.srcElement || resp.originalTarget;
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data;
      if (params.contentType === 'application/json') {
        data = JSON.parse(request.responseText);
      } else {
        data = request.responseText;
      }
      return data;
    }
  }

    function onError(e) {
    return e;
  }

  var promise = new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.addEventListener('error', reject);
    request.addEventListener('load', resolve);
    request.open('POST', params.url, true);
    request.setRequestHeader('Content-Type', params.contentType);
    request.setRequestHeader('Accept', params.contentType);
    request.send(params.data);
  });
  return promise
  .then(onLoad)
  .catch(onError);
}
export default {get, post};
