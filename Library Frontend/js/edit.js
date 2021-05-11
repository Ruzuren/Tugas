document.addEventListener('DOMContentLoaded', function() {
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
        updateUsername.value = res.username
        updateEmail.value = res.email
        updatePassword.value = res.password
    })
  });

// @app.route('/users/<id>/')
function getUserById(id) {
    return fetch("http://127.0.0.1:5000/users/" + id + "/")
    .then(res => res.json())
    .then(jsonRes => jsonRes)
}

const updateForm = document.querySelector('#updateForm');
updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

const data = new FormData(updateForm);
const json = JSON.stringify((Object.fromEntries(data)));
const id = JSON.parse(json).updateid

// @app.route('/users_update/<int:id>/',methods=['PUT'])
fetch('http://localhost:5000/users_update/' + id + '/', {
    method: 'PUT',
    headers: { 
      'Content-Type' : 'application/json'
    },
    body: json
  })
  .then(res => res.json())
  .then(jsonRes => {
    console.log(jsonRes)
    window.location.href = "list_users.html"
  })
})