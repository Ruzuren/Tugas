document.addEventListener('DOMContentLoaded', function () {

    const submitBtn = document.querySelector("#confirmBtn")
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault()

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        const sender = document.getElementById('inputAccNum').value
        const target = document.getElementById('inputTargetAccNum').value;
        const amount = document.getElementById('inputAmount').value;
        const note = document.getElementById('inputNote').value;

        sessionStorage.setItem("DATE", dateTime);
        sessionStorage.setItem("SENDER", sender);
        sessionStorage.setItem("TARGET", target);
        sessionStorage.setItem("AMOUNT", amount);
        sessionStorage.setItem("NOTE", note);

        window.location.href = "transfer_admin_confirmation.html"

    })
})