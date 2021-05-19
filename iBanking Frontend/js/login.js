document.addEventListener('DOMContentLoaded', function () {
    const loginbtn = document.querySelector("#loginbtn")
    loginbtn.addEventListener("click", (e)=>{
        e.preventDefault()
        const loginform = document.querySelector("#loginform")
        let dataform = new FormData(loginform)
        let data = Object.fromEntries(dataform)
        // console.log(data)
        let encode = window.btoa(`${data.Username}:${data.Password}`)
        let auth = `Basic ${encode}`
        
        if (data.Username == "" && data.Password == "" ) {
            return alert("Username and Password is not Given")
        }
        if (data.Username == "" ) {
            return alert("Username is not Given")
        }
        if (data.Password == "" ) {
            return alert("Password is not Given")
        }

        fetch("http://127.0.0.1:5000/login/user", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: auth
            }, 
            credentials:"same-origin"
        })
            .then ((response) => response.json())
            .then ((response) => {
                if (response["message"] == "Success") {
                    if (response["admin"] == "No"){
                        localStorage.user = response["token"];
                        window.location.href = "Dashboard.html"
                    }else {
                        localStorage.admin = response["token"];
                        window.location.href = "Dashboard_admin.html"
                    }
                    
                }else {
                    return alert(response["message"])
                }
            })
    })
})