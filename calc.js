window.addEventListener("load", function () {
    const now = new Date();
    const time = now.toLocaleTimeString();
    alert(`Current time is: ${time}`);
});

const display = document.querySelector(".screen");
const buttons = document.querySelector(".btn-container");
const changeTheme = document.querySelector(".theme-btn");

let themeState = 0;
let currentValue = "";
let previousValue = "";
let operator = null;

// Button clicks
buttons.addEventListener("click", function (e) {

    const button = e.target.closest("button");

    if (!button) return;

    const value = button.dataset.value;
    const action = button.dataset.action;
    const op = button.dataset.op;

    // Numbers and decimal
    if (value !== undefined) {
        currentValue += value;
        display.innerText = currentValue;
        return;
    }

    // Operators
    if (action === "operator") {

        if (currentValue === "") return;

        previousValue = currentValue;
        operator = op;
        currentValue = "";

        return;
    }

    // Equals
    if (action === "equals") {

        if (previousValue === "" || currentValue === "" || operator === null) {
            return;
        }

        calculate();
        return;
    }

    // Clear
    if (action === "Clear") {
        clearAll();
        return;
    }

    // Delete
    if (action === "Delete") {

        currentValue = currentValue.slice(0, -1);
        display.innerText = currentValue;

        return;
    }

    // Square
    if (action === "Square") {

        if (currentValue === "") return;

        currentValue = (Number(currentValue) ** 2).toString();
        display.innerText = currentValue;

        return;
    }
});

function calculate() {

    const a = Number(previousValue);
    const b = Number(currentValue);

    let result;

    switch (operator) {

        case "+":
            result = a + b;
            break;

        case "-":
            result = a - b;
            break;

        case "*":
            result = a * b;
            break;

        case "/":

            if (b === 0) {
                result = "Error";
            } else {
                result = a / b;
            }

            break;

        default:
            return;
    }

    display.innerText = result;

    currentValue = result.toString();
    previousValue = "";
    operator = null;
}

function clearAll() {

    currentValue = "";
    previousValue = "";
    operator = null;

    display.innerText = "";
}

// Theme button
changeTheme.addEventListener("click", function () {

    themeState++;

    if (themeState === 1) {

        document.body.classList.add("neon-ash");

    } else {

        document.body.classList.remove("neon-ash");
        themeState = 0;
    }
});
