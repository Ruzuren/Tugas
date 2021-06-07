document.addEventListener('DOMContentLoaded', function () {

    const AccNum = document.querySelector('input[name="updateaccnum"]');

    const updateForm = document.querySelector('#confirmBtn');
    updateForm.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "admin_edit.html?id=" + AccNum.value
    })


})