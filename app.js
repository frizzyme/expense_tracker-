
const updateTransactionsElements = document.querySelector("#updateTransactions")
const conceptElement = document.querySelector("#concept");
const transactionAmount = document.querySelector("#transaction");
const incomeElement = document.querySelector("#income")
const expenseElement = document.querySelector("#expense")
const savingsElement = document.querySelector("#savings")
const historyElements = document.querySelector(".history")

let ledger = [];

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
    accum = 0
    for (let i = 0; i < ledger.length; i++) {
      let integer = parseInt(ledger[i].value, 10)
      accum += integer;
    }
    savingsElement.innerHTML = accum;
}

function transactionUpdate(ledger) {
    accum_income = 0
    accum_expense = 0 
    for (let i = 0; i < ledger.length; i++) {
      let currentAmount = parseInt(ledger[i].value, 10)
      if (currentAmount >= 0) {
        accum_income += currentAmount
      } else {
        accum_expense += Math.abs(currentAmount)
      }
    }   
    incomeElement.innerHTML = accum_income
    expenseElement.innerHTML = accum_expense
}

function historyHTML (ledger) {
  let transactionListHtml = '';

  for (let indexOfTransaction in ledger) {
    transactionListHtml = transactionListHtml + `
      <p>${ledger[indexOfTransaction].comment} - ${ledger[indexOfTransaction].value}</p>
      <button onclick="deleteTransaction(${indexOfTransaction})">Delete</button>
    `;
    console.log(indexOfTransaction);
  }
  historyElements.innerHTML = transactionListHtml;
}

function deleteTransaction(indexOfTransaction) {
  ledger.splice(indexOfTransaction, 1)
  console.log(ledger)
  transactionUpdate(ledger)
  historyHTML (ledger)
  refreshSavings(ledger)
}

