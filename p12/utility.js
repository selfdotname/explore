export function throw_err(message) {
    if (typeof message != "string") {
        throw new Error("message passed to throw_err() is not a string".toLocaleUpperCase())
    }
    throw new Error(message.toLocaleUpperCase());
}

export function exit() {
    throw new Error("USER ERROR");
}

export function update_error_box(error_box /*--error or --succes box*/, message, isError = true) {
    if (error_box.constructor.name != "HTMLSpanElement") {
        throw_err("error_box is not defined")
    }
    if (typeof message != "string") {
        throw_err("message must be a string")
    }

    if (isError) {
        error_box.innerText = message;
        setTimeout(() => {
            error_box.innerText = ""
        }, 2000)
        exit()
    } else {
        error_box.innerText = message;
        setTimeout(() => {
            error_box.innerText = ""
        }, 2000)
    }
}

export function put_transaction_in_storage(transaction) {
    var transactions = localStorage.getItem("transactions")
    if (transactions == null) {
        //create new transactions array
        transactions = []
    } else {
        // parse the array
        transactions = JSON.parse(transactions)
    }
    transactions.push(transaction)
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

export function get_transactions_from_storage() {
    var transactions = localStorage.getItem("transactions")
    if (transactions == null) {
        return null;
    }
    transactions = JSON.parse(transactions)
    return transactions;
}

export function transaction_card() {
    

    return transaction_card;
}


//functions border