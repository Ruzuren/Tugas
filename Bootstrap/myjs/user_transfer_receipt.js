document.addEventListener('DOMContentLoaded', function () {

    const date = document.querySelector('input[name="date"]');
    const targetacc = document.querySelector('input[name="targetaccnum"]');
    const cash = document.querySelector('input[name="amount"]');
    const notex = document.querySelector('input[name="note"]');

    const dateTime = sessionStorage.getItem('DATE');
    const id = sessionStorage.getItem('TARGET');
    const amount = sessionStorage.getItem('AMOUNT');
    const note = sessionStorage.getItem("NOTE");

    date.value = dateTime
    targetacc.value = id
    cash.value = amount
    notex.value = note

    fetch("http://127.0.0.1:5000/search_user/" + id + "/", {
        method: "GET",
        headers: { 
            'Content-Type' : 'application/json'
            },
            credentials: "same-origin"
        })
        .then((response) => response.json())
        .then((response) => {
            const targetname = document.querySelector('input[name="targetname"]')
            targetname.value = response.full_name
    })

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
            const fullNameTable = document.querySelector('input[name="sendername"]')
            const accNumberTable = document.querySelector('input[name="senderaccnum"]')

            fullNameTable.value = response.full_name
            accNumberTable.value = response.account_number
        })

        // const newform = document.querySelector("#receiptForm")
        // const data = new FormData(newform)
        // const json = JSON.stringify((Object.fromEntries(data)))

        // fetch('http://127.0.0.1:5000/user/transfer/', {
        //     method: 'POST',
        //     headers: { 
        //     'Content-Type' : 'application/json'
        //     },
        //     body: json
        // })
        // .then(res => res.json())
        // .then(text => {
        //     console.log(text)
        //     window.location.href = "Dashboard.html"
        // })

        sessionStorage.clear();






// closing tag below
})