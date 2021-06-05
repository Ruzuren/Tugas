document.addEventListener('DOMContentLoaded', function () {

    const date = document.querySelector('input[name="date"]');
    const senderacc = document.querySelector('input[name="senderaccnum"]')

    const dateTime = sessionStorage.getItem('DATE');
    const sid = sessionStorage.getItem('SENDER');

    date.value = dateTime
    senderacc.value = sid

    fetch("http://127.0.0.1:5000/search_user/" + sid + "/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })
        .then((response) => response.json())
        .then((response) => {
            const targetname = document.querySelector('input[name="sendername"]')
            targetname.value = response.full_name
        })
    
    // const amount = document.getElementById('inputAmount').value;
    

    const newform = document.querySelector("#confirmBtn")
    newform.addEventListener("click", (e) => {
        e.preventDefault();

        const date = document.querySelector("#inputDate").value
        const senderaccnum = document.querySelector("#inputAccNum").value
        const amount = document.querySelector("#inputAmount").value

        sessionStorage.setItem("AMOUNT", amount);

        const data = {
            date: date,
            accnum: senderaccnum,
            amount: amount
        }
        const json = JSON.stringify(data)

        console.log(json)

        fetch('http://127.0.0.1:5000/admin/deposit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
            .then(res => res.json())
            .then(text => {
                console.log(text)
                window.location.href = "deposit_receipt.html"
            })
    })
})