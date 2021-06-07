document.addEventListener('DOMContentLoaded', function () {

    const updateid = document.querySelector('input[name="updateid"]');
    const updateUsername = document.querySelector('input[name="updateusername"]');
    const updateName = document.querySelector('input[name="updatename"]');
    const updateEmail = document.querySelector('input[name="updateemail"]');
    const updateAccNum = document.querySelector('input[name="updateaccnum"]');
    const updateBalance = document.querySelector('input[name="updatebalance"]');
    const updateDate = document.querySelector('input[name="updatedate"]');
    const updatePassword = document.querySelector('input[name="updatepassword"]');
    // const updateBranchName = document.querySelector('input[name="updatename"]');
    // const updateBranchAddress = document.querySelector('input[name="updatename"]');

    let idquery = window.location.search.split("?")[1]
    idquery = idquery.split("=")
    let id = idquery[1]
    getDataByAccnum(id)
        .then(res => {
            // console.log(res)
            updateAccNum.value = res[0].account_number
            updateid.value = res[0].user_id
            // updateBranchName.value = res.branch_id
            // updateName.value = res.full_name
            updateBalance.value = res[0].account_balance
            updateDate.value = res[0].last_transaction


            let uid = updateid.value
            console.log(uid)
            getAccByUserId(uid)
                .then(res => {
                    // updateid.value = res[0].user_id
                    updateName.value = res.user_name
                    updateUsername.value = res.full_name
                    updateEmail.value = res.email
                    // updatePassword.value = res.password
                })
        })

    const updateForm = document.querySelector('#confirmBtn');
    updateForm.addEventListener('click', (e) => {
        e.preventDefault();
        const data = {
            username: updateUsername.value,
            name: updateName.value,
            email: updateEmail.value,
            password: updatePassword.value,
            balance: updateBalance.value,
            date: updateDate.value
        }
        if (data.password == "") {
            delete data.password
        }
        if (data.username == "") {
            delete data.user_name
        }
        if (data.name == "") {
            delete data.full_name
        }
        if (data.email == "") {
            delete data.email
        }
        if (data.balance == "") {
            delete data.balance
        }
        if (data.date == "") {
            delete data.balance
        }
        const json = JSON.stringify(data)
        let iid = updateid.value
        fetch('http://localhost:5000/acc_update1/' + iid + '/', {
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

function getDataByAccnum(id) {
    return fetch("http://127.0.0.1:5000/searchby_accnum/" + id + "/")
        .then(res => res.json())
        .then(jsonRes => jsonRes)
}

function getAccByUserId(uid) {
    return fetch("http://127.0.0.1:5000/acc/" + uid + "/")
        .then(res => res.json())
        .then(jsonRes => jsonRes)
}