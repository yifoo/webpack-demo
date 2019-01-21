
  var Gcon = Gcon || {};
  var domainReg = /(.+?:\/\/.+?)\//i;
  var iconTagReg = /<link.+?shortcut.+?>/i;
  var iconUrlReg = /href="(.+?)"/i;

  function getIconFromFile(url, callback) {
      var xhr = null;
      url += '/';
      var iconUrl = url.match(domainReg)[1] + '/favicon.ico';
      if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      if (xhr != null) {
          xhr.onreadystatechange = function () {
              if (this.readyState == 4) {
                  if (this.status == 200) {
                      if (this.responseText) {
                          callback(iconUrl);
                      } else {
                          getIconFromHtml(url, callback);
                      }
                  } else {
                      getIconFromHtml(url, callback);
                  }
              }
          };
          xhr.open("GET", iconUrl, true);
          xhr.send();
      }
  }

  function getIconFromHtml(url, callback) {
      var xhr = null;
      if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      if (xhr != null) {
          xhr.onreadystatechange = function () {
              if (xhr.readyState == 4) {
                  if (xhr.status == 200) {
                      if (this.responseText) {
                          var html = this.responseText;
                          var iconTag = html.match(iconTagReg)[0];
                          iconTag = iconTag.replace(/\s/g, '');
                          var iUrl = iconTag.match(iconUrlReg)[1];
                          callback(iUrl);
                      } else {
                          callback(null);
                      }
                  } else {
                      callback(null);
                  }
              }
          };
          xhr.open("GET", url, true);
          xhr.send();
      }
  }
  Gcon.getIcon = function (url, callback) {
      var icon = '';
      getIconFromFile(url, callback)
  }
  window.Gcon = Gcon;
