const display = document.querySelector(".display");
const calculator = document.querySelector(".calculator-container");

let buffer = "0";
let backup = "0";
let lastOperator = "";
calculator.addEventListener("click", (evt) => {
  if (evt.target.type == "submit") {
    switch (evt.target.innerText) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        handleStandardNumber(evt.target.innerText);
        break;
      case "C":
        clear();
        break;
      case "←":
        handleBackspace();
        break;
      case "+":
        handleAddition();
        break;
      case "-":
        handleSubtraction();
        break;
      case "×":
        handleMultiplication();
        break;
      case "÷":
        handleDivision();
        break;
      case "=":
        handleEquals();
        break;
      default:
        console.log(`input not recognized: ${evt.target.innerText}`);
    }
  }
});

function updateDisplay() {
  display.innerText = buffer;
}

function handleStandardNumber(number) {
  if (buffer == "0") {
    buffer = number;
  } else {
    buffer += number;
  }
  updateDisplay();
}

function clear() {
  buffer = backup = 0;
  updateDisplay();
}

function handleBackspace() {
  if (buffer.length == 1) {
    resetBuffer();
  } else {
    buffer = buffer.slice(0, -1);
  }
  updateDisplay();
}

function handleAddition() {
  backup = Number.parseFloat(backup) + Number.parseFloat(buffer);
  resetBuffer();
  lastOperator = "+";
  updateDisplay();
}

function handleSubtraction() {
  if (backup == "0") {
    backup = buffer;
  } else {
    backup = Number.parseFloat(backup) - Number.parseFloat(buffer);
  }
  resetBuffer();
  lastOperator = "-";
  updateDisplay();
}

function handleMultiplication() {
  if (backup == "0") {
    backup = buffer;
  } else {
    backup = Number.parseFloat(backup) * Number.parseFloat(buffer);
  }
  resetBuffer();
  lastOperator = "*";
  updateDisplay();
}

function handleDivision() {
  if (backup == "0") {
    backup = buffer;
  } else {
    backup = Number.parseFloat(backup) / Number.parseFloat(buffer);
  }
  resetBuffer();
  lastOperator = "/";
  updateDisplay();
}

function handleEquals() {
  if (lastOperator == "+") {
    buffer = Number.parseFloat(backup) + Number.parseFloat(buffer);
  }
  if (lastOperator == "-") {
    buffer = Number.parseFloat(backup) - Number.parseFloat(buffer);
  }
  if (lastOperator == "*") {
    buffer = Number.parseFloat(backup) * Number.parseFloat(buffer);
  }
  if (lastOperator == "/") {
    if (buffer == "0") {
      buffer = "Undefined";
      updateDisplay();
      resetBuffer();
      backup = "0";
      return;
    }
    buffer = Number.parseFloat(backup) / Number.parseFloat(buffer);
  }
  updateDisplay();
  backup = buffer;
  resetBuffer();
  lastOperator = "";
}

function resetBuffer() {
  buffer = "0";
}
