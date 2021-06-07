document.addEventListener('DOMContentLoaded', function () {


    function createHTMLRow(data) {
        const row = document.createElement('tr')

        for (prop in data) {
            const cell = document.createElement('td')
            cell.innerHTML = data[prop]

            row.appendChild(cell)
        }
        row.appendChild(viewbutton)
        return row
    }

    fetch('http://127.0.0.1:5000/reporting/dormant/', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })
        .then((response) => response.json())
        .then((response) => {
            const allAccountsTable = document.querySelector("#accountsTable")
            const tbody = allAccountsTable.querySelector("tbody")

            tbody.innerHTML = ""

            response.forEach((item) => {
                const row = createHTMLRow({
                    account_number: item.account_number,
                    full_name: item.full_name,
                    account_balance: item.account_balance,
                    last_transaction: item.last_transaction,
                    dormant_period: item.dormant_period
                })
                tbody.appendChild(row)
            });
        })
})