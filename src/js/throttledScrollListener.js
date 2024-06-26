// import customThrottle from './customThrottle';
import scrollListener from './scrollListener';
import { THROTTLE_DELAY } from './variables';

// Підключаю lodash.debounce
const lodashThrottle = require('lodash.throttle');
// const _ = require('lodash'); // другий варіант підключення - всю бібліотеку разом

// Роблю власний throttle, бо lodash дико глючить:
// const throttledScrollListener = customThrottle(scrollListener, THROTTLE_DELAY);

const throttledScrollListener = lodashThrottle(scrollListener, THROTTLE_DELAY);

export default throttledScrollListener;
