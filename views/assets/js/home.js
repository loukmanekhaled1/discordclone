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

    $.ajax({
        url:'/getUser',
        contentType: 'application/json',
        dataType: 'json',
        type:'post',
        headers: { 'Access-Control-Allow-Origin': '*' },
        success:function(data)
        {
            if(data.lastPage == 0)
            {
                $('#showDM').addClass('selected');
            }
        }
    })
