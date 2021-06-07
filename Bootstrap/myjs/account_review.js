document.addEventListener('DOMContentLoaded', function () {
    const updateAccNum = document.querySelector('input[name="updateaccnum"]')
    const updateId = document.querySelector('input[name="updateid"]')
    const updateBranch = document.querySelector('input[name="updatebranch"]');
    const updateName = document.querySelector('input[name="updatename"]');
    const updateBalance = document.querySelector('input[name="updatebalance"]')
    const updateDate = document.querySelector('input[name="updatedate"]')

    let idquery = window.location.search.split("?")[1]
    idquery = idquery.split("=")
    let id = idquery[1]
    getAccountById(id)
        .then(res => {
            updateAccNum.value = res.account_number
            updateId.value = res.user_id
            updateBranch.value = res.branch_id
            updateName.value = res.full_name
            updateBalance.value = res.account_balance
            updateDate.value = res.last_transaction
        })

    const updateForm = document.querySelector('#confirmBtn');
    updateForm.addEventListener('click', (e) => {
        e.preventDefault();

        // const data = new FormData(updateForm);
        const data = {
            balance : updateBalance.value,
            date : updateDate.value,
            branch_id : updateBranch.value
        }

        if (data.balance == "") {
            delete data.balance    
        }
        if (data.date == "") {
            delete data.date
        }
        if (data.branch_id == "") {
            delete data.branch_id
        }
        
        const json = JSON.stringify(data)
        console.log(json)
        // const id = JSON.parse(json).updateid

        // @app.route('/users_update/<int:id>/',methods=['PUT'])
        fetch('http://localhost:5000/acc_update/' + id + '/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
            .then(res => res.json())
            .then(jsonRes => {
                console.log(jsonRes)
                window.location.href = "admin_dashboard.html"
            })
    })


})

// @app.route('/users/<id>/')
function getAccountById(id) {
    return fetch("http://127.0.0.1:5000/acc/" + id + "/")
        .then(res => res.json())
        .then(jsonRes => jsonRes)
}