// function getUsers() {
//     return fetch('http://localhost:5000/users/')
//       .then(response => response.json())
//       .then(json => json);
// }
  
const form = document.querySelector('#userForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const json = JSON.stringify((Object.fromEntries(data)));

    fetch('http://localhost:5000/users_create/', {
        method: 'POST',
        headers: { 
        'Content-Type' : 'application/json'
        },
        body: json
    })
    .then(res => res.json())
    .then(text => console.log(text))
    // window.location.reload(true)
})
  
const updateForm = document.querySelector('#updateForm');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(updateForm);
    const json = JSON.stringify((Object.fromEntries(data)));
    // const updateName = document.querySelector('input[name="ID"]') //selecting the input with name property "name"
    var id = document.querySelector('input[name="id"]')
    fetch('http://localhost:5000/users_update/'+ id.value +'/', {
    // fetch('http://localhost:5000/users_update/'+ data.ID +'/', {
        method: 'PUT',
        headers: { 
        'Content-Type' : 'application/json'
        },
        body: json
    })
    .then(res => res.json())
    .then(text => console.log(text))
})

function getUsers(offset, limit) {
    return fetch('http://localhost:5000/users/pagination?offset=' + offset + "&limit=" + limit)
      .then(response => response.json())
      .then(json => json);
  }

function searchUser(name){
    return fetch('http://localhost:5000/search_user/' + name)
      .then(response => response.json())
      .then(json => json);
  }
  
  function sortUserName(offset=0, limit=5){
    return fetch(`http://localhost:5000/sort_user/name?offset=${offset}&limit=${limit}`)
      .then(response => response.json())
      .then(json => json);
  }
  function sortUserId(offset=0, limit=5){
    return fetch(`http://localhost:5000/sort_user/id?offset=${offset}&limit=${limit}`)
      .then(response => response.json())
      .then(json => json);
  }