document.addEventListener('DOMContentLoaded', function () {

    function createHTMLRow(data) {
        const row = document.createElement('tr')
        for (prop in data) {
            const cell = document.createElement('td')
            cell.innerHTML = data[prop]

            row.appendChild(cell)
        } return row
    }


    fetch('http://localhost:5000/list/transactions/', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })
        .then((response) => response.json())
        .then((response) => {
            const allTransactionsTable = document.querySelector("#transactionsTable")

            const tbody = allTransactionsTable.querySelector("tbody")


            tbody.innerHTML = ""


            response.forEach((item) => {
                const row = createHTMLRow({
                    transaction_id: item.transaction_id,
                    transaction_type: item.transaction_type,
                    transaction_date: item.transaction_date,
                    transaction_amount: item.transaction_amount,
                    transaction_sender: item.transaction_sender,
                    transaction_receiver: item.transaction_receiver
                })
                tbody.appendChild(row)
            });

        })


})