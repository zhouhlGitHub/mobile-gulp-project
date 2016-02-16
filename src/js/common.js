
let test1 = 111;
const test2 = 222;
let [a, b, c] = [1, 2, 3];
let str1 = "\u{20BB7}";
let codeNum = str1.codePointAt(0);
let codeStr = String.fromCodePoint(0x20BB7);
let oriStr = '中国人\u{20BB7}';
let indexStr = oriStr.endsWith('中');
let repeatStr = 'love-'.repeat(10);
//let padStr = 'x'.padStart(5, 'ab');
let sym = Symbol('aaa');
console.log(codeNum + codeStr + "--" + indexStr + repeatStr);
console.log( sym.toString());

class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
let pointB = new point(1,2);

/*function testable(target) {
    target.isTestable = true;
}
@testable
class MyTestableClass {

}
console.log(MyTestableClass.isTestable);*/
export {sym, oriStr, pointB};