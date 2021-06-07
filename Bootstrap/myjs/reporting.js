document.addEventListener('DOMContentLoaded', function () {

    const totaluser = document.querySelector('input[name="totaluser"]');
    const totalacc = document.querySelector('input[name="totalacc"]');
    const totaldebit = document.querySelector('input[name="totaldebit"]');
    const totalcredit = document.querySelector('input[name="totalcredit"]');
    const totalbalance = document.querySelector('input[name="totalbalance"]');

    gettotalacc()
        .then(res => {
            totalacc.value = res.accounts
        })
    gettotaluser()
        .then(res => {
            totaluser.value = res.users
        })
    gettotaldebit()
        .then(res => {
            totaldebit.value = res[0].debit
        })
    gettotalcredit()
        .then(res => {
            totalcredit.value = res[0].credit
        })
    gettotalbalance()
        .then(res => {
            totalbalance.value = res[0  ].balance
        })

})

function gettotalacc() {
    return fetch("http://127.0.0.1:5000/report/accnumber/")
        .then(res => res.json())
        .then(jsonRes => jsonRes)
}

function gettotaluser() {
    return fetch("http://127.0.0.1:5000/report/usernumber/")
        .then(res => res.json())
        .then(jsonRes => jsonRes)
}

function gettotaldebit() {
    return fetch("http://127.0.0.1:5000/report/debit/")
        .then(res => res.json())
        .then(jsonRes => jsonRes)
}

function gettotalcredit() {
    return fetch("http://127.0.0.1:5000/report/credit/")
        .then(res => res.json())
        .then(jsonRes => jsonRes)
}

function gettotalbalance() {
    return fetch("http://127.0.0.1:5000/report/balance/")
        .then(res => res.json())
        .then(jsonRes => jsonRes)
}

