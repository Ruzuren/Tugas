document.addEventListener('DOMContentLoaded', function () {

    function createHTMLRow(data) {
        const row = document.createElement('tr')

        // view button
        const viewbutton = document.createElement('button');

        const insideButton = document.createTextNode("View");
        viewbutton.appendChild(insideButton)
        viewbutton.onclick = () => {
            // pindah ke view.html dengan querystring data.id
            window.location.href = "account_review.html?id=" + data.account_number
        }

        for (prop in data) {
            const cell = document.createElement('td')
            cell.innerHTML = data[prop]

            row.appendChild(cell)
        }
        row.appendChild(viewbutton)
        return row
    }


    fetch('http://localhost:5000/list/accounts/', {
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
                    user_id: item.user_id,
                    branch_id: item.branch_id,
                    account_balance: item.account_balance,
                    last_transaction: item.last_transaction
                })
                tbody.appendChild(row)
            });
        })


})