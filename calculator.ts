interface Calculator {
    add: (a: number, b: number) => number;
    subtract: (a: number, b: number) => number;
    multiply: (a: number, b: number) => number;
    divide: (a: number, b: number) => number;
  }
  
  class BasicCalculator implements Calculator {
    add(a: number, b: number): number {
      return a + b;
    }
  
    subtract(a: number, b: number): number {
      return a - b;
    }
  
    multiply(a: number, b: number): number {
      return a * b;
    }
  
    divide(a: number, b: number): number {
      if (b === 0) {
        throw new Error("Cannot divide by zero");
      }
      return a / b;
    }
  }
  
  const calculator = new BasicCalculator();
  console.log(calculator.add(10,5));
  console.log(calculator.subtract(10,5));
  console.log(calculator.multiply(10,5));
  console.log(calculator.divide(10,5));
  
  
  