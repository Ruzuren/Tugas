document.addEventListener('DOMContentLoaded', function () {
    // selecting the input with name property "name"
    const updateName = document.querySelector('input[name="updatename"]');
    // selecting the input with name property "email"
    const updateEmail = document.querySelector('input[name="updateemail"]');
    // selecting the input with name property "password"
    const updatePassword = document.querySelector('input[name="updatepassword"]')
    // selecting the input with name property "ID"
    const updateId = document.querySelector('input[name="updateid"]')

    const updateUsername = document.querySelector('input[name="updateusername"]')

    let idquery = window.location.search.split("?")[1]
    idquery = idquery.split("=")
    let id = idquery[1]
    getUserById(id)
        .then(res => {
            updateId.value = res.user_id
            updateName.value = res.full_name
            updateUsername.value = res.user_name
            updateEmail.value = res.email
            // updatePassword.value = res.password
        })

    const updateForm = document.querySelector('#confirmBtn');
    updateForm.addEventListener('click', (e) => {
        e.preventDefault();

        // const data = new FormData(updateForm);
        const data = {
            user_name : updateUsername.value,
            full_name : updateName.value,
            email : updateEmail.value,
            password : updatePassword.value
        }

        if (data.password == "") {
            delete data.password    
        }
        if (data.user_name == "") {
            delete data.user_name
        }
        if (data.full_name == "") {
            delete data.full_name
        }
        if (data.email == "") {
            delete data.email
        }
        const json = JSON.stringify(data)
        console.log(json)
        // const id = JSON.parse(json).updateid

        // @app.route('/users_update/<int:id>/',methods=['PUT'])
        fetch('http://localhost:5000/user_update/' + id + '/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
            .then(res => res.json())
            .then(jsonRes => {
                console.log(jsonRes)
                window.location.href = "admin_dashboard.html"
            })
    })


})

// @app.route('/users/<id>/')
function getUserById(id) {
    return fetch("http://127.0.0.1:5000/user/" + id + "/")
        .then(res => res.json())
        .then(jsonRes => jsonRes)
}