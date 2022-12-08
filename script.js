class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return; 
        if (number === "0" && this.previousOperand !== '' && this.currentOperand === '' && this.operation === "÷") {
            alert('Do not divide by zero!');
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.operate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    operate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default: 
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.operate();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})


document.addEventListener('keydown', (event) => {
    let keyCode = event.code;
    let keyName = event.key;
    let specialChar = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
    
    if (keyCode.includes("Digit") && !(specialChar.includes(keyName))) {
        calculator.appendNumber(keyName);
        calculator.updateDisplay();
    } else if (keyCode === "Minus") {
        calculator.chooseOperation(keyName);
        calculator.updateDisplay();
    } else if (keyCode === "Slash") {
        calculator.chooseOperation(keyName);
        calculator.updateDisplay();
    } else if (keyName === "+" && keyCode === "Equal") {
        calculator.chooseOperation(keyName);
        calculator.updateDisplay();
    } else if (keyName === "*") {
        calculator.chooseOperation(keyName);
        calculator.updateDisplay();
    } else if (keyCode === "Equal" && keyName === "=") {
        calculator.operate();
        calculator.updateDisplay();
    } else if (keyCode === "Backspace") {
        calculator.delete();
        calculator.updateDisplay();
    } else if (keyCode === "Delete") {
        calculator.clear();
        calculator.updateDisplay();
    }
}) 
