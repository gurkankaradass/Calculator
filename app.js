const calculatorEl = document.querySelector("#calculator");
const resultEl = document.querySelector(".result");
const clearEl = document.querySelector("#clearAll");
const deleteEl = document.querySelector("#delete");

let firstNumber = ``;
let selectedOperator = ``;
let secondNumber = ``;
let isWaitingANewValue = false;

runEventListeners();

function runEventListeners() {
    calculatorEl.addEventListener("click", write)
    clearEl.addEventListener("click", clearAll);
    deleteEl.addEventListener("click", deleteAChar);
}

function clearAll(){
    resultEl.innerHTML = "";
    firstNumber = ``;
    secondNumber = ``;
    selectedOperator = ``;
    isWaitingANewValue = false;
}

function deleteAChar(){
    if(isWaitingANewValue){
        secondNumber = Calculator.deleteLastCharacter(secondNumber);
    }
    else{
        firstNumber = Calculator.deleteLastCharacter(firstNumber);
    }
    resultEl.innerHTML = Calculator.deleteLastCharacter(resultEl.innerHTML);
}

function write(e) {
    const element = e.target;
    if (element.classList.contains("number")) {
        //Sayıya basılmıştır
        if (!isWaitingANewValue) {
            firstNumber += element.value;
        } else {
            secondNumber += element.value;
        }
        updateResultPanel(element.value);
    }
    else if (element.classList.contains("operator")) {
        //Operatöre basılmıştır
        if (!Calculator.isHaveOperator(resultEl.innerHTML)) {
            selectedOperator = element.value;
            isWaitingANewValue = true;
            updateResultPanel(element.value);
        }

    }
    else if (element.classList.contains("equals")) {
        //Eşittire basılmıştır
        let result = calculate(firstNumber, selectedOperator, secondNumber).toString();
        firstNumber = result;
        isWaitingANewValue = false;
        clearOperatorAndSecondNumber();
        clearResultPanel();
        updateResultPanel(result);
    }
}

function updateResultPanel(value) {
    if(value.length >= 6){
        value = parseFloat(value).toFixed(2)
    }
    resultEl.innerHTML += value;
}

function calculate(firstNumber, operator, secondNumber) {
    let result;
    let isDotHave = Calculator.isDotHave(firstNumber) || Calculator.isDotHave(secondNumber);
    switch (operator) {
        case "+":
            result = isDotHave ? parseFloat(firstNumber) + parseFloat(secondNumber) : parseInt(firstNumber) + parseInt(secondNumber);
            break;
        case "-":
            result = isDotHave ? parseFloat(firstNumber) - parseFloat(secondNumber) : parseInt(firstNumber) - parseInt(secondNumber);
            break;
        case "*":
            result = isDotHave ? parseFloat(firstNumber) * parseFloat(secondNumber) : parseInt(firstNumber) * parseInt(secondNumber);
            break;
        case "/":
            result = isDotHave ? parseFloat(firstNumber) / parseFloat(secondNumber) : parseInt(firstNumber) / parseInt(secondNumber);
            break;
    }
    return result;
}

function clearResultPanel(){
    resultEl.innerHTML = "";
}

function clearOperatorAndSecondNumber(){
    selectedOperator = "";
    secondNumber = "";
}