document.addEventListener('DOMContentLoaded', function () {

    fetch("http://127.0.0.1:5000/account/id/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.user
        },
        credentials: "same-origin"
    })
        .then((response) => response.json())
        .then((response) => {
            const usernameTable = document.querySelector('input[name="Username"]')
            const fullNameTable = document.querySelector('input[name="Full Name"]')
            const accNumberTable = document.querySelector('input[name="Account Number"]')

            usernameTable.value = response.user_name
            fullNameTable.value = response.full_name
            accNumberTable.value = response.account_number
        })
    fetch("http://127.0.0.1:5000/user/balance/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.user
        },
        credentials: "same-origin"
    })
        .then((response) => response.json())
        .then((response) => {
            const balanceTable = document.querySelector('input[name="Balance"]')
            balanceTable.value = response.account_balance
    })


})