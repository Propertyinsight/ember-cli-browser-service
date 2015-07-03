import Ember from 'ember';

export default Ember.Service.extend({
  _detection: null,

  detect: function() {
    // http://stackoverflow.com/a/2401861/188740
    if (!this.get('_detection'))
      this.set('_detection', (function() {
        var ua = navigator.userAgent,
          tem,
          M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
          return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
          tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
          if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
          M.splice(1, 1, tem[1])
        };
        return M.join(' ');
      })());

    // Sample values:
    //
    // MSIE 8
    // MSIE 9
    // MSIE 10
    // IE 11
    // Chrome 41
    // Chrome 42 (using 42 Beta)
    // Chrome 43 (using 43 Dev)
    // Firefox 35
    // Firefox 37 (using 37 Beta)
    // Firefox 3 (usng 3.6)
    // Safari 8
    // Safari 6 (using 6.1)
    // Safari 8 (using iPhone 6)
    // Chrome 4 (Samsung S5 native browser)
    // Opera 27

    return this.get('_detection');
  },

  agent: function() {
    var a = this.detect().split(' ')[0];
    if (a === 'MSIE'){
      a = 'IE';
    }

    return a;
  },

  version: function() {
    var parts = this.detect().split(' ');
    if (parts.length < 2){
      return 0;
    }

    var matches = parts[1].match(/\d+/);
    if (!matches || matches.length < 1){
      return 0;
    }

    return parseInt(matches[0], 10);
  }
});
