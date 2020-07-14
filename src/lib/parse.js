/* eslint-disable no-constant-condition */
"use strict";
exports.__esModule = true;
/**
 * @description calculate factoial of an integerr.
 * @param n the number to calculate n!
 */
function factorial(n) {
  if (n !== Math.floor(n) || n < 0) {
    throw Error("n should be non-negative integer");
  }
  if (n === 0) {
    return 1;
  }
  var temp = 1;
  for (var i = 2; i <= n; i++) {
    temp *= i;
  }
  return temp;
}
/**
 * @description calculate the 4th priority operation, including +, -
 * @param ts TokenStream to read token
 */
function expression(ts) {
  var left = term(ts);
  var token = ts.get();
  while (true) {
    switch (token.kind) {
      case "+":
        left += term(ts);
        token = ts.get();
        break;
      case "-":
        left -= term(ts);
        token = ts.get();
        break;
      default:
        ts.putback(token);
        return left;
    }
  }
}
exports.expression = expression;
/**
 * @description calculate the 3rd priority operation, including *, /, %
 * @param ts TokenStream to read token
 */
function term(ts) {
  var left = power(ts);
  var right;
  var token = ts.get();
  while (true) {
    switch (token.kind) {
      case "*":
        left *= power(ts);
        token = ts.get();
        break;
      case "/":
        right = power(ts);
        if (right === 0) {
          throw new Error("Divide by 0");
        }
        left /= right;
        token = ts.get();
        break;
      case "%":
        right = power(ts);
        if (left !== Math.floor(left) || right !== Math.floor(right)) {
          throw Error("mod float");
        }
        left = left % right;
        token = ts.get();
        break;
      default:
        ts.putback(token);
        return left;
    }
  }
}
/**
 * @description calculate the 2nd priority operation, including ^
 * @param ts TokenStream to read token
 */
function power(ts) {
  var left = primary(ts);
  var token = ts.get();
  while (true) {
    if (token.kind === "^") {
      left = Math.pow(left, primary(ts));
      token = ts.get();
    } else {
      ts.putback(token);
      return left;
    }
  }
}
/**
 * @description calculate the 1st priority operation,
 *      including number, buildin constants, +(monocular), -(monocular), !, bulidin functions
 * @param ts TokenStream to read token
 */
function primary(ts) {
  var token = ts.get();
  var nextToken;
  switch (token.kind) {
    case "(":
      var value = expression(ts);
      token = ts.get();
      if (token.kind !== ")") {
        throw new Error("')' expected");
      }
      return value;
    case "number":
      nextToken = ts.get();
      if (nextToken.kind === "!") {
        return factorial(token.value);
      } else {
        ts.putback(nextToken);
        return token.value;
      }
    case "sin":
      return Math.sin(primary(ts));
    case "cos":
      return Math.cos(primary(ts));
    case "tan":
      return Math.tan(primary(ts));
    case "ln":
      return Math.log(primary(ts));
    case "log":
      return Math.log(primary(ts)) * Math.LOG10E;
    case "-":
      return -primary(ts);
    case "+":
      return primary(ts);
    default:
      throw new Error("primary expected");
  }
}
