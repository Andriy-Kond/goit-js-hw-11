// ~ Власний throttle для слухача window-scroll (lodash дико глючить)
export default function customThrottle(callback, timeout) {
  let timer = null;
  return function perform(...args) {
    if (timer) return;
    timer = setTimeout(() => {
      callback(...args);
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
