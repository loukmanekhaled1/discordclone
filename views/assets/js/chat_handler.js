
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