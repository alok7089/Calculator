const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calculator__keys")


// keys.addEventListener("click", e => {
//     if (e.target.matches("button")) {
//         const key = e.target
//         const action = key.dataset.action
//         if (!action) {
//             console.log("numbers key!")
//         }
//         if (
//             action === "add" ||
//             action === "subtract" ||
//             action === "multiply" ||
//             action === "divide"
//         ) {
//             console.log("operation key!")
//         }
//         if (action === "decimal") {
//             console.log("decimal key!")
//         }
//         if (action === "clear") {
//             console.log("clear key!")
//         }
//         if (action === "calculate") {
//             console.log("equals key!")
//         }
//     }
// })

const calculate = (n1, oper, n2) => {
    let result = ''

    if (oper == 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (oper == 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (oper == 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (oper == 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}
const display = calculator.querySelector('.calculator__display')
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent

        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        const previousKeyType = calculator.dataset.previousKeyType
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
                calculator.dataset.previousKeyType = 'number'
            }
            else {
                display.textContent = displayedNum + keyContent
            }
        }
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + keyContent
            }
            if (calculator.dataset.previousKeyType == 'operator') {
                calculator.dataset.previousKeyType = 'decimal'
                display.textContent = '0.'
            }
        }
        if (action === 'clear') {
            display.textContent = 0
        }
        if (action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide") {
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.num1 = displayedNum
            calculator.dataset.operator = action
        }
        if (action === 'calculate') {
            const num1 = calculator.dataset.num1
            const operator = calculator.dataset.operator
            const num2 = displayedNum
            display.textContent = calculate(num1, operator, num2)
        }
    }
})