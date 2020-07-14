import { calculate } from "@/lib/calculate";

describe("Test number and constant", () => {
  it("simple integer", () => {
    expect(calculate("1024")).toEqual(1024);
  });
  it("positive integer", () => {
    expect(calculate("+321")).toEqual(321);
  });
  it("negative integer", () => {
    expect(calculate("-123")).toEqual(-123);
  });
  it("float", () => {
    expect(calculate("1.5000")).toEqual(1.5);
    expect(calculate("0.00")).toEqual(0);
    expect(calculate("1.00")).toEqual(1);
    expect(calculate("-3.14")).toEqual(-3.14);
  });
  it("constants", () => {
    expect(calculate("pi")).toEqual(Math.PI);
    expect(calculate("Pi")).toEqual(Math.PI);
    expect(calculate("-pi")).toEqual(-Math.PI);
    expect(calculate("e")).toEqual(Math.E);
  });
});

describe("Test Simple expression", () => {
  it("simple plus", () => {
    expect(calculate("1+1")).toEqual(2);
  });
  it("simple minus", () => {
    expect(calculate("2-1")).toEqual(1);
  });
  it("simple multiply", () => {
    expect(calculate("2*2")).toEqual(4);
  });
  it("simple divide", () => {
    expect(calculate("6/2")).toEqual(3);
    expect(() => {
      calculate("5/0");
    }).toThrow("Divide by 0");
  });
  it("simple mod", () => {
    expect(calculate("5%2")).toEqual(1);
    expect(() => {
      calculate("5.5%2");
    }).toThrow("mod float");
  });
  it("simple power", () => {
    expect(calculate("2^3")).toEqual(8);
  });
  it("simple factorial", () => {
    expect(calculate("5!")).toEqual(120);
  });
});

describe("Buildin functions", () => {
  it("triangle functions", () => {
    expect(calculate("sin(0.5*pi)")).toEqual(Math.sin(0.5 * Math.PI));
    expect(calculate("cos(pi)")).toEqual(-1);
    expect(calculate("tan(0.25*pi)")).toEqual(Math.tan(0.25 * Math.PI));
  });
  it("log", () => {
    expect(calculate("log(10)")).toEqual(1);
    expect(calculate("ln e")).toEqual(1);
  });
});

describe("Stored value and variable", () => {
  it("stored value", () => {
    expect(calculate("R", 5)).toEqual(5);
    expect(calculate("R", 0)).toEqual(0);
    expect(calculate("R+1", 5)).toEqual(6);
    expect(calculate("R*2", 5)).toEqual(10);
  });
  it("variable", () => {
    expect(calculate("x", undefined, 2)).toEqual(2);
    expect(calculate("x", undefined, 0)).toEqual(0);
    expect(calculate("x+1", undefined, 2)).toEqual(3);
    expect(calculate("x^2", undefined, 2)).toEqual(4);
  });
});

describe("Operation order", () => {
  it("plus, minus, multiply and divide", () => {
    expect(calculate("11*12/(1+(1/2))+5*(6-4)*31")).toEqual(398);
    expect(calculate("1+++3")).toEqual(4);
    expect(calculate("1-+3")).toEqual(-2);
    expect(calculate("1+-3")).toEqual(-2);
    expect(calculate("4*-3")).toEqual(-12);
    expect(calculate("-2*-9++4*-2")).toEqual(10);
  });
  it("power, mod, factorial and functions", () => {
    expect(calculate("9+222%77*7*8-3*3*33%23")).toEqual(3796);
    expect(calculate("-5!")).toEqual(-120);
    expect(calculate("3!^2")).toEqual(36);
    expect(calculate("sin 0 + 1")).toEqual(1);
  });
});

describe("Illegal operations", () => {
  it("incorrect expression", () => {
    expect(() => {
      calculate("(");
    }).toThrow();
    expect(() => {
      calculate(")");
    }).toThrow();
    expect(() => {
      calculate("R");
    }).toThrow();
    expect(() => {
      calculate("x");
    }).toThrow();
    expect(() => {
      calculate("(1+1");
    }).toThrow();
    expect(() => {
      calculate("1+2)");
    }).toThrow();
    expect(() => {
      calculate("1**2");
    }).toThrow();
  });
  it("divide by 0", () => {
    expect(() => {
      calculate("5/0");
    }).toThrow();
    expect(() => {
      calculate("0/0");
    }).toThrow();
  });
  it("mod float", () => {
    expect(() => {
      calculate("2%3.5");
    }).toThrow();
    expect(() => {
      calculate("2.5%3");
    }).toThrow();
  });
  it("factorial of float and negative", () => {
    expect(() => {
      calculate("1.23!");
    }).toThrow();
    expect(() => {
      calculate("(-5)!");
    }).toThrow();
  });
});
