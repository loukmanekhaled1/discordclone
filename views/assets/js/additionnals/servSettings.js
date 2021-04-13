/*  $('#settings').hide();
    $('#settings').show(150)
                            */
    $('#settings .right .view').hide();
    $('#settings .right .view.view1').show();

$('#closeButton').click(function()
{
    $('#settings').addClass("hide");

    setTimeout(() => {
        $('#settings').remove();
    }, 200);
})

$('#servName').html($('.container .sidebar .top h1').html());
$('#changeServNI').val($('.container .sidebar .top h1').html());


$('#settings .left .tab[target="roles"]').click(function()
{
    $('#settings .right .view').hide();
    $('#settings .right .view.view-2').show();
    $('#settings .left .tab.selected').removeClass('selected');
    $(this).addClass('selected');
})
$('#settings .left .tab[target="general"]').click(function()
{
    $('#settings .right .view').hide();
    $('#settings .right .view.view1').show();
    $('#settings .left .tab.selected').removeClass('selected');
    $(this).addClass('selected');
})
$('#changeServNI').keydown('keypress',function (){
    
});

$.post({
    url:'/getGuildRoles',
    data:{
        guildID:document.querySelector('.leftBar .selected').getAttribute('guildtarget')
    },
    success:function(res)
    {
        res.forEach(role => {
            if(role.color == 0){
            $('#settings .view.view-2 .rolesList').append(`<div class="role b" target="${role.increment}">${role.name}</div>`)
            }else{
                let a = document.createElement('div');
                a.classList.add('role');
                a.innerText = role.name;
                a.setAttribute('target',role.increment);
                a.style.color = '#'+role.color;
                var alreadyInHover = false;
                a.onmouseover = function(){
                   
                    alreadyInHover = true;
                    a.style.backgroundColor = '#'+role.color+'1A';
                }
                a.onmousedown = function(){
                    
                    a.style.color = '#fff';
                    a.style.backgroundColor = '#'+role.color;
                }
                a.onmouseup = function(){
                    a.style.color = '#'+role.color;
                    alreadyInHover == false ? a.style.backgroundColor = '' : a.style.backgroundColor = '#'+role.color+'1A';;
                }
                a.onmouseleave = function(){
                    
                    alreadyInHover = false;
                    a.style.backgroundColor = '';
                    
                }
                document.querySelector('#settings .view.view-2 .rolesList').appendChild(a);
            }
        });
    }
})