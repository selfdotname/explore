import * as utility from "./utility.js"

const transactions = utility.get_transactions_from_storage()
const income = document.getElementById("income")
const expenses = document.getElementById("expenses")
const balance_d = document.getElementById("balance")

if (transactions == null) {
    income.innerHTML = "&#8358; " + 0
    expenses.innerHTML = "&#8358; " + 0
    balance_d.innerHTML = "&#8358; " + 0
} else {
    var totalIncome = 0, totalExpense = 0, balance = 0;
    transactions.forEach(transaction => {
        if (transaction.type == "Income") {
            totalIncome += parseInt(transaction.amount)
        } else if (transaction.type == "Expenses") {
            totalExpense += parseInt(transaction.amount)
        }

        const transaction_card = document.createElement("div")
        transaction_card.id = "transaction-card"

        const date = document.createElement("h3")
        date.id = "date"
        date.innerText = new Date(parseInt(transaction.date)).toLocaleString()

        const desc = document.createElement("h3")
        desc.id = "desc"
        desc.innerText = transaction.description

        const type = document.createElement("h3")
        type.id = "type"
        type.innerText = transaction.type

        const amount = document.createElement("h3")
        amount.id = "amount"
        amount.innerHTML = "&#8358; " + parseInt(transaction.amount).toLocaleString()


        if(transaction.type == "Income"){
            amount.style.color = type.style.color = "lightgreen"
             
        } else {
            amount.style.color = type.style.color = "red"
        }

        transaction_card.appendChild(amount)
        transaction_card.appendChild(desc)
        transaction_card.appendChild(type)
        transaction_card.appendChild(date)

        document.body.appendChild(transaction_card)
    });

    balance = totalIncome - totalExpense
    balance_d.innerHTML = "&#8358; " + balance.toLocaleString()
    if (balance < 0) {
        balance_d.style.color = "red"
    } else {
        balance_d.style.color = "black"
    }
    income.innerHTML = "&#8358; " + totalIncome.toLocaleString()
    expenses.innerHTML = "&#8358; " + totalExpense.toLocaleString()
}