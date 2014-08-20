// If it turns out we need a better polyfill we can grab mozilla's at:
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.removeEventListener?redirectlocale=en-US&redirectslug=DOM%2FEventTarget.removeEventListener#Polyfill_to_support_older_browsers
export function addEventListener(receiver, eventName, fn) {
  if (receiver.addEventListener) {
    return receiver.addEventListener(eventName, fn);
  } else if (receiver.attachEvent) {
    return receiver.attachEvent('on' + eventName, fn);
  }
}

export function removeEventListener(receiver, eventName, fn) {
  if (receiver.removeEventListener) {
    return receiver.removeEventListener(eventName, fn);
  } else if (receiver.detachEvent) {
    return receiver.detachEvent('on' + eventName, fn);
  }
}
