document.addEventListener('DOMContentLoaded', function () {

    function createHTMLRow(data) {
        const row = document.createElement('tr')
        
        // view button
        const viewbutton = document.createElement('button');

        const insideButton = document.createTextNode("View");
        viewbutton.appendChild(insideButton)
        viewbutton.onclick = () => {
            // pindah ke view.html dengan querystring data.id
            window.location.href = "user_review.html?id=" + data.user_id
        }
        for (prop in data) {
            const cell = document.createElement('td')
            cell.innerHTML = data[prop]
            

            row.appendChild(cell)
        } 
        row.appendChild(viewbutton)
        return row
    }
    fetch('http://localhost:5000/list/users/', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })
        .then((response) => response.json())
        .then((response) => {
            const allUsersTable = document.querySelector("#usersTable")
            const tbody = allUsersTable.querySelector("tbody")

            tbody.innerHTML = ""


            response.forEach((item) => {
                const row = createHTMLRow({
                    user_id: item.user_id,
                    user_name: item.user_name,
                    full_name: item.full_name,
                    email: item.email,
                    password: item.password
                    // is_admin : item.is_admin
                })
                tbody.appendChild(row)
            });
            // tbody.appendChild(viewbutton)
            // console.log(tbody)
        })

})