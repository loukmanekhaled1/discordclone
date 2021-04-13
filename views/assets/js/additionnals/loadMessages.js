setTimeout(()=>{
    $.post({
    url:'/getChannelMessages',
    data:{
        channelID:document.querySelector('.container .sidebar .ctn .selected').getAttribute('channeltarget')
    },
    success:function(messages)
    {
        document.getElementById('a').innerText = 'hamed';
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
                    
                        document.querySelector('#a').appendChild(msgAC);
                    
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
                    
                        document.querySelector('#a').appendChild(msgAC);
                       msgA++

                       if(msgA == 5) return msgA= 0;
                }
                    
                
       


                    }
                
                
            })
            })
        }
        
        

    })
},150)
