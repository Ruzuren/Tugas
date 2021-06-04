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
            const targetname = document.querySelector('input[name="sendername"]')
            targetname.value = response.full_name
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

    const newform = document.querySelector("#confirmBtn")
    newform.addEventListener("click", (e) => {
        e.preventDefault();

        const date = document.querySelector("#inputDate").value
        const senderaccnum = document.querySelector("#inputAccNum").value
        const targetaccnum = document.querySelector("#inputTargetAccNum").value
        const amount = document.querySelector("#inputAmount").value
        const note = document.querySelector("#inputNote").value

        const data = {
            date : date,
            senderaccnum : senderaccnum,
            targetaccnum : targetaccnum,
            amount : amount,
            note : note
        }
        const json = JSON.stringify(data)
        
        console.log(json)

        fetch('http://127.0.0.1:5000/admin/transfer/', {
            method: 'POST',
            headers: { 
            'Content-Type' : 'application/json'
            },
            body: json
        })
        .then(res => res.json())
        .then(text => {
            console.log(text)
            window.location.href = "transfer_admin_receipt.html"
        })
    })

// closing tag below
})

