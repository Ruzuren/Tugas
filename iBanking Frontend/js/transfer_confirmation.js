document.addEventListener('DOMContentLoaded', function () {
// window.addEventListener('load', () => {

    const date = document.querySelector('input[name="date"]');
    const targetacc = document.querySelector('input[name="targetaccnum"]');
    const cash = document.querySelector('input[name="amount"]');
    const notex = document.querySelector('input[name="note"]');

    const dateTime = sessionStorage.getItem('DATE');
    const id = sessionStorage.getItem('TARGET');
    const amount = sessionStorage.getItem('AMOUNT');
    const note = sessionStorage.getItem("NOTE");

    // document.getElementById('date').innerHTML = dateTime;
    // document.getElementById('targetaccnum').innerHTML = id;
    // document.getElementById('amount').innerHTML = amount;
    // document.getElementById('note').innerHTML = note;

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

    const newform = document.querySelector("#confirmationForm")
    newform.addEventListener("submit", (e) => {
        e.preventDefault();

        const date = document.querySelector("#date").value
        const targetaccnum = document.querySelector("#targetaccnum").value
        const amount = document.querySelector("#amount").value
        const note = document.querySelector("#note").value

        const data = {
            date : date,
            targetaccnum : targetaccnum,
            amount : amount,
            note : note
        }
        const json = JSON.stringify(data)
        
        console.log(json)

        fetch('http://127.0.0.1:5000/user/transfer/', {
            method: 'POST',
            headers: { 
            'Content-Type' : 'application/json',
            token: localStorage.user
            },
            body: json
        })
        .then(res => res.json())
        .then(text => {
            console.log(text)
            window.location.href = "transfer_receipt.html"
        })
    })

    // const confirmBtn = document.querySelector(".confirmBtn")
    // confirmBtn.addEventListener("click", (e) => {
    //     e.preventDefault()

    //     window.location.href = "transfer_receipt.html"
    // })
// closing tag below
})

