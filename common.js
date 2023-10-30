import {API_KEY, headingFont, url, color, size} from './constants.js';
// import * as mathf from './helper.js';
import {mul as multiply} from './helper.js';
import Admin from './admin.js';
import foo from './foo.js';
import {default as days} from './days.js';

console.warn(API_KEY);

// console.log(mathf.mul(3,4));
console.log(multiply(3,4));
console.log(headingFont);

let admin = new Admin();
console.log(admin);

foo();

console.warn(days[3]);

console.log(`col: ${color}, size: ${size}`);