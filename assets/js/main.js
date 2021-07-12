    // TOGGLE WITH THE 3 THEMES
let range = document.querySelector('.themechoice');

range.addEventListener('input', changeTheme);

function changeTheme() {
    if(range.value == 1) {
        document.body.classList.add("theme1");
        document.body.classList.remove("theme2");
        document.body.classList.remove("theme3");
    } else if(range.value == 2) {
        document.body.classList.add("theme2");
        document.body.classList.remove("theme1");
        document.body.classList.remove("theme3");
    } else if(range.value = 3) {
        document.body.classList.add("theme3");
        document.body.classList.remove("theme1");
        document.body.classList.remove("theme2");
    }
}


// CALCULATOR PROGRAMMATION
class Calculator {
    constructor(previousTextElement, currenttextElement, currentOperand) {
        this.previousTextElement = previousTextElement;
        this.currenttextElement = currenttextElement;
        this.currentOperand = currentOperand;
        this.clear();
    }

clear() {
    this.currentOperand = '0'
    this.previousOperand = ''
    this.operation = undefined
}

delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
    if(this.currentOperand === '') {
        this.currentOperand = '0'
    }
}

appendValue(number) {
    if (this.currentOperand.length >= 10) return false;
    if(number === '.' && this.currentOperand.includes('.')) return;
    if (number !== '.' && this.currentOperand === '0') {
        this.currentOperand = ''
        this.currentOperand = this.currentOperand.toString() + number.toString()
    } else {
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
}

chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
        this.compute()
    }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
}

compute() {
    let computation
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    switch (this.operation) {
          case '+':
                computation = previous + current
                break
          case '-':
                computation = previous - current
                break
          case '/':
                computation = previous / current
                break
          case 'x':
                computation = previous * current
                break
          default:
                return
    }
    this.currentOperand = parseFloat(computation).toFixed(3);
    this.operation = undefined
    this.previousOperand = ''
}


updateDisplay() {
    this.currenttextElement.innerText = this.currentOperand;
    if(this.operation != null) {
        this.previousTextElement.innerText = `${this.previousOperand} ${this.operation}`
    } else {
        this.previousTextElement.innerText = this.previousOperand;
    }
}

}


const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const egalBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const resetBtn = document.querySelector('[data-reset]');
const previousTextElement = document.querySelector('[data-previous-operand]');
const currenttextElement = document.querySelector('[data-current-operand]');
let currentOperand = '0';

const calculator = new Calculator(previousTextElement, currenttextElement, currentOperand)

calculator.updateDisplay()

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendValue(button.innerText)
        calculator.updateDisplay()
    })
})

deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

egalBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

resetBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
