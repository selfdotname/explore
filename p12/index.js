import * as utility from "./utility.js"

const addBtn = document.getElementById("add-btn")
// if button is not selected
if (addBtn == null) {
    utility.throw_err("add button not selected")
}

// button click
addBtn.onclick = () => {
    const amountInput = document.getElementById("amount")
    const descriptionInput = document.getElementById("description")

    const error_box = document.getElementById("error")
    const success_box = document.getElementById("success")

    // if error box is not properly selected
    if (error_box == null) {
        utility.throw_err("error_box not selected")
    }
    // if success box is not properly selected
    if (success_box == null) {
        utility.throw_err("success_box not selected")
    }

    // if amount or description arent properly selected
    if (amountInput == null || descriptionInput == null) {
        utility.throw_err("amount or description input undefined")
    }

    // if their values are empty
    if (amountInput.value == "" || descriptionInput.value == "") {
        utility.update_error_box(error_box,"Amount and/or description empty")
    }

    const amountValue = amountInput.value

    // if amount is not a number
    if (/[^0-9]/.test(amountValue)) {
        //display error for 2 secs
        utility.update_error_box(error_box, "Amount must be a number")
    }

    const description_value = descriptionInput.value

    // if description value is less than 5 characters
    if (descriptionInput.value.length < 5) {
        utility.update_error_box(error_box, "Description must be greater than 4 characters")
    }

    const typeInput = document.getElementById("type")
    if (typeInput == null) {
        utility.throw_err("type input undefined")
    }

    const type_value = typeInput.value

    const transaction = {
        amount: amountValue,
        description: description_value,
        type: type_value,
        date: new Date().getTime()
    }

    utility.put_transaction_in_storage(transaction)

    utility.update_error_box(success, "Transaction saved", false)

    amountInput.value = descriptionInput.value = ""
}
