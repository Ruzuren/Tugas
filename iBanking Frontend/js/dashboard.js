document.addEventListener('DOMContentLoaded', function () {

    function createHTMLRow(data) {
        const row = document.createElement('tr') 
        for (prop in data) {
            const cell = document.createElement('td')
            cell.innerHTML = data[prop]

            row.appendChild(cell)
        }return row
    } 

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

    const historybtn = document.querySelector(".historybtn")
    // historybtn.onclick = function () {
    historybtn.addEventListener("click", (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/user/history/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.user
            },
            credentials: "same-origin"
        })
            .then((response) => response.json())
            .then((response) => {
                const historyTable = document.querySelector("#historytable")
                const thead = historyTable.querySelector("thead")
                const tbody = historyTable.querySelector("tbody")
                
                thead.innerHTML=""
                tbody.innerHTML= ""

                const head = createHTMLRow({
                    transaction_id : "Transaction ID",
                    transaction_type : "Transaction Type",
                    transaction_date : "Transaction Date",
                    transaction_amount : "Transaction Amount",
                    transaction_sender : "Transaction Sender",
                    transaction_receiver : "Transaction Receiver"
                })
                thead.appendChild(head)
                
                response.forEach((item) => {
                    const row = createHTMLRow({
                        transaction_id : item.transaction_id,
                        transaction_type : item.transaction_type,
                        transaction_date : item.transaction_date,
                        transaction_amount : item.transaction_amount,
                        transaction_sender : item.transaction_sender,
                        transaction_receiver : item.transaction_receiver
                    })
                tbody.appendChild(row)
                });
            })
    })


})