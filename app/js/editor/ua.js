export const UA = {
  _ua: navigator.userAgent,

  // 是否 webkit
  isWebkit: function isWebkit() {
    var reg = /webkit/i
    return reg.test(this._ua)
  },

  // 是否 IE
  isIE: function isIE() {
    return 'ActiveXObject' in window
  }
}
