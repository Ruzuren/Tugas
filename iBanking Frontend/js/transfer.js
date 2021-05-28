// document.addEventListener('DOMContentLoaded', function () {

//     var today = new Date();
//     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     var dateTime = date+' '+time;

//     const target = document.getElementById('target').value;
//     const amount = document.getElementById('amount').value;
//     const note = document.getElementById('note').value;

    // const transferForm = document.querySelector("#transferForm");
    // transferForm.addEventListener("submit", (e) => {
    //     e.preventDefault();
    function handleSubmit() {

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        const target = document.getElementById('target').value;
        const amount = document.getElementById('amount').value;
        const note = document.getElementById('note').value;

        sessionStorage.setItem("DATE", dateTime);
        sessionStorage.setItem("TARGET", target);
        sessionStorage.setItem("AMOUNT", amount);
        sessionStorage.setItem("NOTE", note);
        
        // window.location.href = "transfer_confirmation.html"
    // })
    return;
    }
    
// closing tag below
// })