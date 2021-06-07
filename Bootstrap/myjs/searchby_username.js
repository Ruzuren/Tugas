document.addEventListener('DOMContentLoaded', function () {

    const updateName = document.querySelector('input[name="updatename"]');

    const updateForm = document.querySelector('#confirmBtn');
    updateForm.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "admin_edit.html?id=" + updateName.value
    })


})