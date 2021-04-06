"use strict"
document.title = "Discord";
$('#addGuild').click(function(){
    $.ajax({
        url:'body/createServer.ejs',
        success:function(res)
        {
            $('body').append(res);
        }
    })
})
