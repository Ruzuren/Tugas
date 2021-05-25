document.addEventListener('DOMContentLoaded', function () {
    function createHTMLRow(data) {
        const row = document.createElement('tr') 
        for (prop in data) {
            const cell = document.createElement('td')
            cell.innerHTML = data[prop]

            row.appendChild(cell)
        }return row
    } 

    const userBtn = document.querySelector(".userBtn")
    userBtn.addEventListener("click", (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/list/users/', {
            method: "GET",
            headers: { 
                'Content-Type' : 'application/json'
                },
                credentials: "same-origin"
            })
            .then((response) => response.json())
            .then((response) => {
                const allUsersTable = document.querySelector("#allUsersTable")
                const thead = allUsersTable.querySelector("thead")
                const tbody = allUsersTable.querySelector("tbody")
                
                thead.innerHTML=""
                tbody.innerHTML= ""

                const head = createHTMLRow({
                    user_id : "user_id",
                    user_name : "user_name",
                    full_name : "full_name",
                    email : "email",
                    is_admin : "is_admin"
                })
                thead.appendChild(head)
                
                response.forEach((item) => {
                    const row = createHTMLRow({
                        user_id : item.user_id,
                        user_name : item.user_name,
                        full_name : item.full_name,
                        email : item.email,
                        is_admin : item.is_admin
                    })
                tbody.appendChild(row)
                });
    })
    })

    const accBtn = document.querySelector(".accBtn")
    accBtn.addEventListener("click", (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/list/accounts/', {
            method: "GET",
            headers: { 
                'Content-Type' : 'application/json'
                },
                credentials: "same-origin"
            })
            .then((response) => response.json())
            .then((response) => {
                const allAccountsTable = document.querySelector("#allAccountsTable")
                const thead = allAccountsTable.querySelector("thead")
                const tbody = allAccountsTable.querySelector("tbody")
                
                thead.innerHTML=""
                tbody.innerHTML= ""

                const head = createHTMLRow({
                    account_number : "account_number",
                    account_type : "account_type",
                    account_balance : "account_balance",
                    user_id : "user_id",
                    branch_id : "branch_id"
                })
                thead.appendChild(head)
                
                response.forEach((item) => {
                    const row = createHTMLRow({
                        account_number : item.account_number,
                        account_type : item.account_type,
                        account_balance : item.account_balance,
                        user_id : item.user_id,
                        branch_id : item.branch_id
                    })
                tbody.appendChild(row)
                });
    })
    })

    const transBtn = document.querySelector(".transBtn")
    transBtn.addEventListener("click", (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/list/transactions/', {
            method: "GET",
            headers: { 
                'Content-Type' : 'application/json'
                },
                credentials: "same-origin"
            })
            .then((response) => response.json())
            .then((response) => {
                const allTransactionsTable = document.querySelector("#allTransactionsTable")
                const thead = allTransactionsTable.querySelector("thead")
                const tbody = allTransactionsTable.querySelector("tbody")
                
                thead.innerHTML=""
                tbody.innerHTML= ""

                const head = createHTMLRow({
                    transaction_id : "transaction_id",
                    transaction_type : "transaction_type",
                    transaction_date : "transaction_date",
                    transaction_amount : "transaction_amount",
                    transaction_sender : "transaction_sender",
                    transaction_receiver : "transaction_receiver"
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