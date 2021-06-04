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
    
        const newform = document.querySelector("#confirmBtn")
        newform.addEventListener("click", (e) => {
            e.preventDefault();
    
            const date = document.querySelector("#inputDate").value
            const targetaccnum = document.querySelector("#inputTargetAccNum").value
            const amount = document.querySelector("#inputAmount").value
            const note = document.querySelector("#inputNote").value
    
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
                window.location.href = "transfer_user_receipt.html"
            })
        })
    
    // closing tag below
    })
    
    