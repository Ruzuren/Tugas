const updateName = document.querySelector('input[name="updatename"]') //selecting the input with name property "name"
const updateUsername = document.querySelector('input[name="updateusername"]') //selecting the input with name property "username"
const updateEmail = document.querySelector('input[name="updateemail"]') //selecting the input with name property "email"
const updatePassword = document.querySelector('input[name="updatepassword"]') //selecting the input with name property "password"
const updateFormButton = document.querySelector("button#updateitem") 

function createHTMLRow(data) {  
    const row = document.createElement('tr');

    // view button
    const viewbutton = document.createElement('button');

    const insideButton = document.createTextNode("View");
    viewbutton.appendChild(insideButton)
    viewbutton.onclick = () => {
        // pindah ke view.html dengan querystring data.id
        window.location.href = "view.html?id=" + data.id   
    }
    
    // delete button ==============================
    const deleteButton = document.createElement('button')
    deleteButton.innerText = "Delete"
    deleteButton.onclick = function(){
    fetch('http://localhost:5000/users/' + data.id + "/", {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(text => console.log(text))
    }
    // ==============================================

    for(prop in data) {
        const cell = document.createElement('td')
        cell.innerHTML = data[prop];
        row.appendChild(cell);
    }
        // add button to table
        row.appendChild(viewbutton)
        row.appendChild(deleteButton)
        return row;
}


function onLogout(td){
    if(confirm('Do you want to logout?'));
}