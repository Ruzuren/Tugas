document.addEventListener('DOMContentLoaded', function () {
    
    const date = document.querySelector('input[name="date"]');
    const senderacc = document.querySelector('input[name="senderaccnum"]')
    const cash = document.querySelector('input[name="amount"]');

    const dateTime = sessionStorage.getItem('DATE');
    const sid = sessionStorage.getItem('SENDER')
    const amount = sessionStorage.getItem('AMOUNT');

    date.value = dateTime
    senderacc.value = sid
    cash.value = amount

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

    sessionStorage.clear();

// closing tag below
})

