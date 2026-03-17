function calculator(input) {
  try {
    const result = Function(`"use strict"; return (${input})`)();
    return `Result: ${result}`;
  } catch {
    return "Calculation error";
  }
}

module.exports = calculator;