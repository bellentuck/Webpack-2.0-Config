// This is the paragraph of code following `use strict` in output.js

"use strict";
/******************************************************************************/
/******************** I. CLASS CREATION ***************************************/
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];

      descriptor.enumerable = descriptor.enumerable || false;
      // enumerable:
        //  key intuition:
        // An object's enumerable properties are its KEYS.
        //
        // [Like in objective-c: classes colloquially "are" objects, but technically are pointers]
        //
        // "If a property isn't identified as enumerable,
        // the loop will ignore that it's within the object."
        // (Jonathan Lonowski, StackOverflow, https://stackoverflow.com/questions/17893718/what-does-enumerable-mean)
      descriptor.configurable = true;
      // configurable:
        // (1) property behavior can be modified. (meta)
        // configurable props can be made non-enumerable,
        // non-writable, even non-cofigurable.
        // (2) "Configurable properties are the only ones that can
        // be removed using the delete operator."
        // (http://arqex.com/967/javascript-properties-enumerable-writable-configurable)
      if ("value" in descriptor) descriptor.writable = true;  // beautfully writ if statemt
        // Writable:
        // values can be modified.

      Object.defineProperty(target, descriptor.key, descriptor);
                          //object, property name, descriptor
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/******************************************************************************/
/******** II. WHATEVER WAS IN THE INPUT (e.g., index.js) **********************/
__webpack_require__(1); // require('./styles.scss');

var ConnectiveTissue = function () { // class ConnectiveTissue {
  function ConnectiveTissue() {
    _classCallCheck(this, ConnectiveTissue);
  }
  _createClass(ConnectiveTissue, [{
    key: 'ligament',
    value: function ligament(bone1, bone2) {    // ligament(bone1, bone2) {
      document.write('The ' + bone1 + ' is connected to the...' + bone2 + ' bone!');
    }
  }]);
  return ConnectiveTissue;
}();
var mu = new ConnectiveTissue();    // const mu = new ConnectiveTissue;
mu.ligament('arm', 'thigh');
/******************************************************************************/
/******************** III. CLASS CREATION ***************************************/
//#sourceURL=[module]
//#sourceMappingURL=
/**
 *        data:application/json;
 *        charset=utf-8;
 *        base64, [KEYHOLE: INSERT VERY LONG KEY HERE]
**/
//# sourceURL=webpack-internal:///0
