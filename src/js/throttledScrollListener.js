import customThrottle from './customThrottle';
import scrollListener from './scrollListener';
import { THROTTLE_DELAY } from './variables';

// Роблю власний throttle, бо lodash дико глючить:
const throttledScrollListener = customThrottle(scrollListener, THROTTLE_DELAY);
// Підключаю lodash.debounce
// const throttle = require('lodash.throttle'); // перший варіант підключення
// const _ = require('lodash'); // другий варіант підключення - всю бібліотеку разом

export default throttledScrollListener;
