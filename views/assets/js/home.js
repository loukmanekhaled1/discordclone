"use strict"


document.title = "Discord";
var currentUrl = "channels/";
var currentTitle = "Discord";

$.post({
    url:'/getGuilds',
    contentType:'application/json',
    dataType:'json',
    headers: { 'Access-Control-Allow-Origin': '*' },
    success:function(guilds)
    {
    
        guilds.forEach(guild=>{
        
            $.post({
                url:'/getGuildData',
                
                data:{
                    guildID:guild.guildID
                },
                success:function(guildData)
                {
               
                   guildData = JSON.parse(guildData);
                    guildData = guildData[0]
                 
                    var gds = guildData.name.split(' ');
                    var gtx = "";
                    for(var i = 0;i<=2;i++)
                    {
                        if(gds[i] == undefined) break;
                        gtx+=gds[i][0];
                    }
                   
                    $('.leftBar .guilds').prepend(`<button onclick='loadGuildContent(this,${guild.guildID})'>${gtx}</button>`)

                }
            })
            
        
    
})
    }
})
$('#showDM').click(function(){

    $.ajax({
        url:'/getUser',
        contentType: 'application/json',
        dataType: 'json',
        type:'post',
        headers: { 'Access-Control-Allow-Origin': '*' },
        success:function(data)
        {
            
            $('.selected').removeClass('selected');
            if(data.lastPage == 0)
            {
                $.ajax({
                    url:'/body/dm.ejs',
                    success:function(res)
                    {
                        $('.container').html(res);
                       
                        $('.container .sidebar .bottom .left h2').html(data.pseudo);
                        if(data.pfp == 0)
                        {
                            $('.container .sidebar .bottom .left .image').append('<img src="images/pfp.png"> ')
                        }
                    }
                })
                $('#showDM').addClass('selected');
                currentUrl+= "@me";
                updatePageState(currentTitle,currentUrl);
            }
        }
    })
})
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
                    url:'/body/dm.ejs',
                    success:function(res)
                    {
                        $('.container').html(res);
                       
                        $('.container .sidebar .bottom .left h2').html(data.pseudo);
                        if(data.pfp == 0)
                        {
                            $('.container .sidebar .bottom .left .image').append('<img src="images/pfp.png"> ')
                        }
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
function loadGuildContent(elem,guildID){
 
    $.post({
        url:'/loadGuild',
        data:{guildID:guildID},
        success:function(res)
        {
            $('.selected').removeClass('selected');
            elem.classList.add('selected');
            $('.container').html(res);
            $.post({
                url:'/getGuildCategories',
                data:{guildID:guildID},
                success:function(categories)
                {
                  
                   categories.forEach((categorie)=>{
                      console.log(categorie)
                       $.post({
                        url:'/getGuildChannels',
                        data:{guildID:guildID,parent:categorie.increment},
                        success:function(channels)
                        {
                          
                            console.log(channels);
                        }
                    })
                   })
                    
                }
            })
                        
        }
    })
}
