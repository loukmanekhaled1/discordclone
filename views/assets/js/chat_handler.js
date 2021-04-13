

$.post({
    url:'/getGuildMemberData',
    data:{
        guildID:document.querySelector('.leftBar .selected').getAttribute('guildtarget')
    },
    success:function(res)
    {
        if(res.isOwner == 1)
        {
            document.getElementById('hbT').innerHTML = `Voilà ton nouveau serveur, tout beau tout propre. Tu peux voir ici quelques étapes pour t'aider dans tes débuts. Pour en savoir plus, va jeter un œil à notre <a class="anchor-3Z-8Bb anchorUnderlineOnHover-2ESHQB" href="https://support.discord.com/hc/fr/articles/360045138571?utm_source=discord&amp;utm_medium=blog&amp;utm_campaign=2020-06_help-new-user&amp;utm_content=--t%3Apm" rel="noreferrer noopener" target="_blank">Guide des premiers pas</a>`
        }
    }
})

$.post({
    url:'/getGuildMembers',
    data:{
        guildID:document.querySelector('.leftBar .selected').getAttribute('guildtarget')
    },
    success:function(res)
    {
        $.post({
            url:'/getGuildRoles',
            data:{
                guildID:document.querySelector('.leftBar .selected').getAttribute('guildtarget')
            },
            success: function(roles)
            {
               
                roles.forEach( (role)=>{
                    if(role['separated'] == 0) return;
                     $.post({
                        url:'/validateRoleExistance',
                        data:{
                            role:role.increment,
                            members:res,
                            guildID:document.querySelector('.leftBar .selected').getAttribute('guildtarget')
                        },
                        success: function(vdR)
                        {
                            if(vdR == '1')
                            {
                                if(role.everyoneRole == 1){
                                 $('.container .guildContentR.right').append(`<div target="${role.increment}" class="categoryContainer"><h1 class="category">En ligne</h1></div></div>`)
                                }else{
                                 $('.container .guildContentR.right').append(`<div target="${role.increment}" class="categoryContainer"><h1 class="category">${role.name}</h1></div></div>`)

                                }
                            }
                        }
                    })
                })

        res.forEach((member)=>{
            var highestRole = 0;
             $.post({
            url:'/getGuildMembersRoles',
            data:{
                member:member['memberID'],
                guildID:document.querySelector('.leftBar .selected').getAttribute('guildtarget')
            },
            success: function(res2)
            {
                res2.forEach((ghr)=>{
                    if(highestRole == 0 || ghr.roleIncrement < highestRole && roles[ghr.roleIncrement-1]['separated'] !== 0) highestRole = ghr.roleIncrement;
                })
                 $.post({
                    url:'/getUserByID',
                    data:{
                        userID:member.memberID
                    },
                    success: function(memberData)
                    {
                        console.log(highestRole)
                         $('.container .guildContentR.right .categoryContainer[target="'+highestRole+'"]').append(`<div class="user ${roles[highestRole - 1].color != 0 ? '' : 'noColor'}"><img src="${memberData.pfp !== 0 ? 'images/profile_pictures/'+member.memberID+".png" : 'images/pfp.png'}"><div class="block"><h1 style="color:${roles[highestRole-1].color !== 0 ? roles[highestRole-1].color : ''};">${memberData.pseudo}</h1><p></p></div></div>`);
                    }
                })
            }
        })
        })
        
            }
        })



        
        
    }
})
setTimeout(()=>{
document.querySelectorAll('.container .guildContentR.right .categoryContainer').forEach((ctn)=>{
    var validated = 0;
    ctn.childNodes.forEach((node)=>{
        if(node.classList.contains('user')){
            validated = 1;
        }
    })
    if(validated == 0){
        ctn.remove();
    }
})
    
},80)

    

document.getElementById('msger').addEventListener('keydown',function()
{
    


    if(event.keyCode == 13)
    {
        event.preventDefault();
        var input = document.getElementById('msger');
        if(input.value.trim() == '') return;
        $.post({
            url:'/postMessage',
            data:{
                message:input.value.trim(),
                channelID:document.querySelector('.container .sidebar .ctn .selected').getAttribute('channeltarget')
            },
            success:function(res)
            {
                input.value = '';
            }
        })
    }
})
setTimeout(()=>{
    
        

        $.post({
            url:'/getChannelMessages',
            data:{
                channelID:document.querySelector('.container .sidebar .ctn .selected').getAttribute('channeltarget')
            },
            success:function(messages)
            {
                
                        var msgA = 0;
                        if(!messages[0]) return;
                        var currentUser = messages[0]['sender'];
                        messages.forEach((msg)=>{
                            $.post({
                    url:'/getUserByID',
                    data:{
                        userID:msg.sender
                    },
                    success:function(userData)
                    {
                        if(msg.sender !== currentUser) {
                            
                            currentUser = msg['sender'];
                            msgA = 0;
                        }
                        
                            //console.log(msg.sender)
                            console.log(currentUser)

                            if(msgA == 0){
                              
                            var msgAC = document.createElement('div'),
                            header = document.createElement('div'),
                            pfp = document.createElement('img'),
                            username = document.createElement('h1'),
                            msgContent = document.createElement('p');
                            pfp.setAttribute('width','45px');
                            pfp.setAttribute('height','45px');
        
                            userData.pfp == 1 ? pfp.src = `images/profile_pictures/${userData['ID']}.png` : pfp.src="images/pfp.png";
                                header.classList.add('header')
                                msgAC.classList.add('msg');
                                msgAC.classList.add('msgA');
                                msgAC.appendChild(header);
                                header.appendChild(pfp);
                                username.innerText = userData.pseudo;
                                msgContent.classList.add('msgContent');
                               
                                msgContent.innerText = msg.content;
                                header.appendChild(username);
                                msgAC.appendChild(msgContent)
                            
                                document.querySelector('.container .messages').appendChild(msgAC);
                            
                                msgA++;
                        }else{
                            var msgAC = document.createElement('div'),
                            //header = document.createElement('div'),
                            //pfp = document.createElement('img'),
                            //username = document.createElement('h1'),
                            msgContent = document.createElement('p');
                            //pfp.setAttribute('width','45px');
                            //pfp.setAttribute('height','45px');
        
                            //userData.pfp == 1 ? pfp.src = `images/profile_pictures/${userData['ID']}.png` : pfp.src="images/pfp.png";
                                //header.classList.add('header')
                                msgAC.classList.add('msg');
                              
                               // msgAC.appendChild(header);
                                //header.appendChild(pfp);
                                //username.innerText = userData.pseudo;
                                msgContent.classList.add('msgContent');
                               
                                msgContent.innerText = msg.content;
                                //header.appendChild(username);
                                msgAC.appendChild(msgContent)
                            
                                document.querySelector('.container .messages').appendChild(msgAC);
                               msgA++
        
                               if(msgA == 5) return msgA= 0;
                        }
                            
                        
               
        
                        document.querySelector('.container .messages').scrollTop = document.querySelector('.container .messages').scrollHeight;
        
                            }
                        
                        
                    })
                    })
                }
                
                
        
                
            
})

},100)
$('.container .messages').scroll(function() {
    let scrollTop = document.querySelector('.container .messages').scrollTop;
    let docHeight = document.querySelector('.container .messages').clientHeight;
    let winHeight = document.querySelector('.container .messages').scrollHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.round(scrollPercent * 100);

    console.log(`(${scrollPercentRounded}%)`);
})
$.post({
    url:'/guildTooltips',
    data:{
        tooltip:'s1'
    },
    success:function(res)
    {
        document.querySelector('.container .sidebar .top').innerHTML += res;
      $('.container .sidebar .top .tooltip').css('display','none');

      $('.container .sidebar .top .tooltip div[target="settings"]').click(function()
{
    $.post({
        url:'/loadBody',
        data:{
            target:'serverSettings',
        },
        success:function(res)
        {
            $('body').append(res);
        }
    })
});

//createInvite

$('.container .sidebar .top .tooltip div[target="invite"]').click(function()
{
    console.log('aa')
        $.post({
            url:'/loadBody',
            data:{
                target:'createInvite',
            guildID:document.querySelector('.leftBar .selected').getAttribute('guildtarget')

            },
            success:function(res)
            {
                $('body').append(res);
            }
        })


})


    }
})
$('.container .sidebar .top').click(function()
{
   
   if(document.querySelector('.container .sidebar .top .tooltip').style.display == 'none')
   {
       $('.container .sidebar .top i').removeClass('fa-chevron-down');
       $('.container .sidebar .top i').addClass('fa-times');

      $('.container .sidebar .top .tooltip').show(180);

   }else{
    $('.container .sidebar .top i').addClass('fa-chevron-down');
    $('.container .sidebar .top i').removeClass('fa-times');
      $('.container .sidebar .top .tooltip').hide(180);

   }
})
