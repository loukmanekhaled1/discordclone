"use strict"
document.querySelector('#loginForm').submit.onclick = function(){
    var email = document.querySelector('#loginForm').email;
    var password = document.querySelector('#loginForm').password;
    var submitBTNVAL = document.querySelector('#loginForm').submit.innerHTML;
    email.style.borderColor = '';
    password.style.borderColor = '';
    var done = true;
    if(email.value.trim() == '') {done=false; email.style.borderColor = '#FF0000'};
    if(password.value.trim() == ''){done = false; password.style.borderColor = '#FF0000'};
    if(done == false) return;
    $.post({
        url:"/login",
        data:{email:email.value.trim(),password:password.value.trim()},
        beforeLoad:function()
        {
            document.querySelector('#loginForm').submit.innerHTML = '...';
        },
        success:function(res)
        {
            document.querySelector('#loginForm').submit.innerHTML = submitBTNVAL;
            console.log(res);
        }
    })
}