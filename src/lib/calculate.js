"use strict";
exports.__esModule = true;
var parse_1 = require("./parse");
var token_1 = require("./token");
/**
 * @description a wrapper to init tokenstream and call expression to calculate the value
 * @param input the string to calculate
 * @param storeVal the stored value to parse token "R"
 * @param variable the varialbe value to parse token "x"
 * @throws Error
 */
function calculate(input, storeVal, variable) {
  var ts = new token_1.TokenStream(input);
  if (storeVal !== undefined) {
    ts.setStoreVal(storeVal);
  }
  if (variable !== undefined) {
    ts.setVariable(variable);
  }
  var result = parse_1.expression(ts);
  if (ts.get().kind !== "end") {
    throw new Error("bad token");
  }
  return result;
}
exports.calculate = calculate;
