document.addEventListener('DOMContentLoaded', function () {
    const newform = document.querySelector("#accountForm");
    newform.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = new FormData(newform);
        const json = JSON.stringify((Object.fromEntries(data)));

        fetch('http://127.0.0.1:5000/create/account/', {
            method: 'POST',
        headers: { 
        'Content-Type' : 'application/json'
        },
        body: json
        })
        .then(res => res.json())
        .then(text => {
            console.log(text)
            window.location.href = "Dashboard_admin.html"
        })
        
    })
})