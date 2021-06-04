document.addEventListener('DOMContentLoaded', function () {
    
    const date = document.querySelector('input[name="date"]');
    const senderacc = document.querySelector('input[name="senderaccnum"]')
    const targetacc = document.querySelector('input[name="targetaccnum"]');
    const cash = document.querySelector('input[name="amount"]');
    const notex = document.querySelector('input[name="note"]');

    const dateTime = sessionStorage.getItem('DATE');
    const sid = sessionStorage.getItem('SENDER')
    const tid = sessionStorage.getItem('TARGET');
    const amount = sessionStorage.getItem('AMOUNT');
    const note = sessionStorage.getItem("NOTE");

    date.value = dateTime
    senderacc.value = sid
    targetacc.value = tid
    cash.value = amount
    notex.value = note

    fetch("http://127.0.0.1:5000/search_user/" + sid + "/", {
        method: "GET",
        headers: { 
            'Content-Type' : 'application/json'
            },
            credentials: "same-origin"
        })
        .then((response) => response.json())
        .then((response) => {
            const sendername = document.querySelector('input[name="sendername"]')
            sendername.value = response.full_name
    })

    fetch("http://127.0.0.1:5000/search_user/" + tid + "/", {
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

    sessionStorage.clear();

// closing tag below
})

