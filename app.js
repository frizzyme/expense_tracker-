
const updateTransactionsElements = document.querySelector("#updateTransactions")
const conceptElement = document.querySelector("#concept");
const transactionAmount = document.querySelector("#transaction");
const incomeElement = document.querySelector("#income")
const expenseElement = document.querySelector("#expense")
const savingsElement = document.querySelector("#savings")
const historyElements = document.querySelector(".history")

let ledger = [];
let savings = 0;
let accum_income = 0;
let accum_expense = 0;
let HTMLResult = '';

updateTransactionsElements.addEventListener("submit", (event) => {
    event.preventDefault();

    let transactionObject = {
        value: transactionAmount.value,
        comment: conceptElement.value,
    };

    ledger.push(transactionObject);
    
    transactionAmount.value = "";
    conceptElement.value = "";
    
    refreshSavings(ledger);
    transactionUpdate(ledger);
    historyHTML (ledger);

});

function refreshSavings(ledger) {
    for (let i = 0; i < ledger.length; i++) {
      let integer = parseInt(ledger[i].value, 10)
      savingsElement += integer;
    }
    savingsElement.innerHTML = savings;
}

function transactionUpdate(ledger) {
  for (let i = 0; i < ledger.length; i++) {
    let integer = parseInt(ledger[i].value, 10)
    if (integer >= 0) {
      accum_income += integer
      incomeElement.innerHTML = accum_income
    } else {
      accum_expense += Math.abs(integer)
      expenseElement.innerHTML = accum_expense
    }
  }   
}

function historyHTML (ledger) {
  for (let unit in ledger) {
    HTMLResult = HTMLResult + `
      <p>${ledger[unit].comment} - ${ledger[unit].value}</p>
      <button onclick="deleteTransaction(${unit})">Delete</button>
      `
      console.log(unit)
      historyElements.innerHTML = HTMLResult
  }
}

function deleteTransaction(transactionId) {
  if (ledger.length > 1) {
    ledger.splice(transactionId, 1)
    console.log(ledger)
    transactionUpdate(ledger)
    historyHTML (ledger)
    refreshSavings(ledger)
  } else {
    let savings = 0;
    let accum_expense = 0;
    let accum_income = 0;
    let HTMLResult = "";
  }
}

