var K = function() {};

export function o_create(obj, props) {
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
