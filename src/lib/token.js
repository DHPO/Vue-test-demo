"use strict";
exports.__esModule = true;
/**
 * @description operators(+, -, *, /, ...), number, functions(sin, cos, tan, log, ...), parenthesis and end
 */
var Token = /** @class */ (function() {
  function Token(kind, value) {
    this.kind = kind;
    this.value = value;
  }
  return Token;
})();
exports.Token = Token;
/**
 * @description the stream to fetch Token,
 *       including single-charater token('+', '-', ...), and multi-charater token(number, 'pi', 'sin', ...)
 * @function setStoreVal set the stored value and charater "R" will be parsed to that value
 * @function setVariable set the variable value and charater "x" will be parsed to that value
 * @function putback put a token back to the stream
 * @function get fetch a token from the stream
 */
var TokenStream = /** @class */ (function() {
  function TokenStream(input) {
    this.input = input.toLocaleLowerCase().replace(/\s+/g, ""); // To Lower case, and remove spaces
    this.index = 0;
  }
  TokenStream.prototype.setStoreVal = function(storeVal) {
    this.storeVal = storeVal;
  };
  TokenStream.prototype.setVariable = function(variable) {
    this.variable = variable;
  };
  TokenStream.prototype.putback = function(token) {
    if (this.full) {
      return false;
    } else {
      this.buffer = token;
      this.full = true;
      return true;
    }
  };
  TokenStream.prototype.get = function() {
    if (this.full) {
      this.full = false;
      return this.buffer;
    } else {
      if (this.index === this.input.length) {
        return new Token("end", 0);
      }
      var ch = this.input[this.index];
      switch (ch) {
        case "(":
        case ")":
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
        case "!":
        case "^":
          this.index += 1;
          return new Token(ch, 0);
        case "p":
        case "i":
        case "s":
        case "n":
        case "c":
        case "o":
        case "t":
        case "a":
        case "l":
          if (this.input.substr(this.index, 2) === "pi") {
            this.index += 2;
            return new Token("number", Math.PI);
          } else if (this.input.substr(this.index, 2) === "ln") {
            this.index += 2;
            return new Token("ln", 0);
          } else if (this.input.substr(this.index, 3) === "log") {
            this.index += 3;
            return new Token("log", 0);
          } else if (this.input.substr(this.index, 3) === "sin") {
            this.index += 3;
            return new Token("sin", 0);
          } else if (this.input.substr(this.index, 3) === "cos") {
            this.index += 3;
            return new Token("cos", 0);
          } else if (this.input.substr(this.index, 3) === "tan") {
            this.index += 3;
            return new Token("tan", 0);
          } else {
            throw new Error("bad token");
          }
        case "e":
          this.index += 1;
          return new Token("number", Math.E);
        case ".":
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          var num = parseFloat(this.input.substr(this.index));
          this.index += String(num).length;
          if (this.input[this.index] === ".") {
            // handle "1.0"
            this.index++;
          }
          while (this.input[this.index] === "0") {
            // handle "1.2000"
            this.index++;
          }
          return new Token("number", num);
        }
        case "r":
          if (this.storeVal !== undefined) {
            this.index += 1;
            return new Token("number", this.storeVal);
          } else {
            throw Error("bad token: r");
          }
        case "x":
          if (this.variable !== undefined) {
            this.index += 1;
            return new Token("number", this.variable);
          } else {
            throw Error("bad token: x");
          }
        default:
          throw new Token("bad token", 0);
      }
    }
  };
  return TokenStream;
})();
exports.TokenStream = TokenStream;
