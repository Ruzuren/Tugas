document.addEventListener('DOMContentLoaded', function () {
    const newform = document.querySelector("#branchForm");
    newform.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = new FormData(newform);
        const json = JSON.stringify((Object.fromEntries(data)));

        fetch('http://127.0.0.1:5000/create/branch/', {
            method: 'POST',
            headers: { 
            'Content-Type' : 'application/json'
            },
            body: json
        })
        .then(res => res.json())
        .then(text => {
            console.log(text)
            window.location.href = "admin_dashboard.html"
        })
        
    })
})