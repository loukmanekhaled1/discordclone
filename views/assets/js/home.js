"use strict"
document.title = "Discord";

var currentUrl = "channels/";
var currentTitle = "Discord";
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
                $.ajax({
                    url:'/body/dmSidebar.ejs',
                    success:function(res)
                    {
                        $('.sidebar').html(res);

                    }
                })
                $('#showDM').addClass('selected');
                currentUrl+= "@me";
                updatePageState(currentTitle,currentUrl);
            }
        }
    })
function updatePageState(title,url)
{
 
}