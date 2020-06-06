function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var vendors = ['webkit', 'moz'];

for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (callback) {
    var id = window.setTimeout(function () {
      callback();
    }, 1000 / 60);
    return id;
  };
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
} // Generate a pseudo-GUID by concatenating random hexadecimal.


function guid() {
  // Generate four random hex digits.
  function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

function find(list, predicate) {
  for (var index = 0; index < list.length; index++) {
    if (predicate(list[index], index, list)) {
      return list[index];
    }
  }

  return null;
}

var Rafs = /*#__PURE__*/function () {
  function Rafs() {
    _classCallCheck(this, Rafs);

    this.pool = [];
    this.rafId = null; // start the Animation

    this.animation();
  }

  _createClass(Rafs, [{
    key: "animation",
    value: function animation() {
      var _this = this;

      this.rafId = window.requestAnimationFrame(function () {
        // assign to a variable to avoid ensure no race conditions happen
        // b/w flushing the pool and interating through the pool
        var pool = _this.pool;
        pool.forEach(function (item) {
          item[Object.keys(item)[0]]();
        });

        _this.animation();
      });
    } // add the callback to the pool, and return the Unique ID as callbackId

  }, {
    key: "add",
    value: function add(callback) {
      var entry = find(this.pool, function (item) {
        return item[Object.keys(item)[0]] === callback;
      }); // Avoid pushing the same callback

      if (entry) return Object.keys(entry)[0];
      var callbackId = guid();
      this.pool.push(_defineProperty({}, callbackId, callback));
      return callbackId;
    } // if you provide this callbackId, it will delete related callback function
    // without callbackId, it will cancel the animation

  }, {
    key: "cancel",
    value: function cancel() {
      var callbackId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (callbackId) {
        this.pool = this.pool.filter(function (item) {
          return !item[callbackId];
        });
      } else {
        window.cancelAnimationFrame(this.rafId);
      }
    }
  }]);

  return Rafs;
}();

var instance = new Rafs();
var requestAnimationFrame = instance.add.bind(instance);
var cancelAnimationFrame = instance.cancel.bind(instance); // export default {

export default Rafs;
export { cancelAnimationFrame, requestAnimationFrame };
