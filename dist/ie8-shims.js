define("ie8Shims",
  ["exports"],
  function(__exports__) {
    "use strict";
    function isNativeFunc(func) {
      // This should probably work in all browsers likely to have ES5 array methods
      return func && Function.prototype.toString.call(func).indexOf('[native code]') > -1;
    }

    var a_forEach = isNativeFunc(Array.prototype.forEach) ? Array.prototype.forEach : function(fun /*, thisp */) {
      if (this === void 0 || this === null) {
        throw new TypeError();
      }

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function") {
        throw new TypeError();
      }

      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          fun.call(thisp, t[i], i, t);
        }
      }
    };
    __exports__.a_forEach = a_forEach;
    var a_reduce = isNativeFunc(Array.prototype.reduce) ? Array.prototype.reduce : function(callback, opt_initialValue){
      if (null === this || 'undefined' === typeof this) {
        // At the moment all modern browsers, that support strict mode, have
        // native implementation of Array.prototype.reduce. For instance, IE8
        // does not support strict mode, so this check is actually useless.
        throw new TypeError(
            'Array.prototype.reduce called on null or undefined');
      }
      if ('function' !== typeof callback) {
        throw new TypeError(callback + ' is not a function');
      }
      var index = 0, length = this.length >>> 0, value, isValueSet = false;
      if (1 < arguments.length) {
        value = opt_initialValue;
        isValueSet = true;
      }
      for ( ; length > index; ++index) {
        if (!this.hasOwnProperty(index)) continue;
        if (isValueSet) {
          value = callback(value, this[index], index, this);
        } else {
          value = this[index];
          isValueSet = true;
        }
      }
      if (!isValueSet) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      return value;
    };
    __exports__.a_reduce = a_reduce;
    var a_map = isNativeFunc(Array.prototype.map) ? Array.prototype.map : function(callback, thisArg) {

        var T, A, k;

        if (this == null) {
          throw new TypeError(" this is null or not defined");
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
          throw new TypeError(callback + " is not a function");
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (thisArg) {
          T = thisArg;
        }

        // 6. Let A be a new array created as if by the expression new Array(len) where Array is
        // the standard built-in constructor with that name and len is the value of len.
        A = new Array(len);

        // 7. Let k be 0
        k = 0;

        // 8. Repeat, while k < len
        while(k < len) {

          var kValue, mappedValue;

          // a. Let Pk be ToString(k).
          //   This is implicit for LHS operands of the in operator
          // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
          //   This step can be combined with c
          // c. If kPresent is true, then
          if (k in O) {

            // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
            kValue = O[ k ];

            // ii. Let mappedValue be the result of calling the Call internal method of callback
            // with T as the this value and argument list containing kValue, k, and O.
            mappedValue = callback.call(T, kValue, k, O);

            // iii. Call the DefineOwnProperty internal method of A with arguments
            // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
            // and false.

            // In browsers that support Object.defineProperty, use the following:
            // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

            // For best browser support, use the following:
            A[ k ] = mappedValue;
          }
          // d. Increase k by 1.
          k++;
        }

        // 9. return A
        return A;
      };
    __exports__.a_map = a_map;
    var a_indexOf = isNativeFunc(Array.prototype.indexOf) ? Array.prototype.indexOf : function (searchElement /*, fromIndex */ ) {
      /* jshint eqeqeq:false */
      "use strict";
      if (this == null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;

      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
        return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
    __exports__.a_indexOf = a_indexOf;
    var a_filter = isNativeFunc(Array.prototype.filter) ? Array.prototype.filter : function(fun /*, thisp*/) {
      'use strict';

      if (!this) {
        throw new TypeError();
      }

      var objects = Object(this);
      var len = objects.length >>> 0;
      if (typeof fun !== 'function') {
        throw new TypeError();
      }

      var res = [];
      var thisp = arguments[1];
      for (var i in objects) {
        if (objects.hasOwnProperty(i)) {
          if (fun.call(thisp, objects[i], i, objects)) {
            res.push(objects[i]);
          }
        }
      }

      return res;
    };
    __exports__.a_filter = a_filter;
    // If it turns out we need a better polyfill we can grab mozilla's at:
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.removeEventListener?redirectlocale=en-US&redirectslug=DOM%2FEventTarget.removeEventListener#Polyfill_to_support_older_browsers
    function addEventListener(receiver, eventName, fn) {
      if (receiver.addEventListener) {
        return receiver.addEventListener(eventName, fn);
      } else if (receiver.attachEvent) {
        return receiver.attachEvent('on' + eventName, fn);
      }
    }

    __exports__.addEventListener = addEventListener;function removeEventListener(receiver, eventName, fn) {
      if (receiver.removeEventListener) {
        return receiver.removeEventListener(eventName, fn);
      } else if (receiver.detachEvent) {
        return receiver.detachEvent('on' + eventName, fn);
      }
    }

    __exports__.removeEventListener = removeEventListener;var K = function() {};

    function o_create(obj, props) {
      K.prototype = obj;
      obj = new K();
      if (props) {
        K.prototype = obj;
        for (var prop in props) {
          K.prototype[prop] = props[prop].value;
        }
        obj = new K();
      }
      K.prototype = null;

      return obj;
    }

    __exports__.o_create = o_create;
  });