
$.ajax({
    url:'/getUser',
    contentType: 'application/json',
    dataType: 'json',
    type:'post',
    headers: { 'Access-Control-Allow-Origin': '*' },
    success:function(data)
    {
        document.getElementById('servName').value = "Serveur de "+data.pseudo;
        console.log('success')
    }
})


$('#close').click(function(){
    let b = 5;
    setInterval(()=>{
        if(b<=0) return;
        b--;
        document.querySelector('#createServer').style.backgroundColor = 'rgba(0,0,0,'+b/10+')'
    },22)
    setTimeout(()=>{
        document.querySelector('#createServer').remove();
    },135)
    document.querySelector('#createServer .CForm').classList.add('CC');
})
$('#tab1').click(function(){
    
    $('#createServer .CForm').addClass('f1');
    $('#createServer .CForm .h').addClass('hide');
    $('#createServer .CForm .side1').removeClass('hide');
    $('#createServer .CForm .side1').addClass('show');
    
    
    
   
})
$('#return1').click(function(){
    $('#createServer .CForm').addClass('f1');
    $('#createServer .CForm .h').removeClass('hide');
    //$('#createServer .CForm .h').addClass('show');
    $('#createServer .CForm.f1').removeClass('f1');
    
    $('#createServer .CForm .side1').removeClass('show');

    $('#createServer .CForm .side1').addClass('hide');

})
$('#tab2,#tab3,#tbb').click(function(){
    $('#createServer .side1').removeClass('show');

    $('#createServer .side1').addClass('hide');
    $('#createServer .side2').removeClass('hide');

    $('#createServer .side2').addClass('show');
})
$('#joinServBTN').click(function()
{
    $('#createServer .CForm').addClass('f1');

    $('#createServer .CForm .h').addClass('hide');
    $('#createServer .CForm .side3').removeClass('hide');
    $('#createServer .CForm .side3').addClass('show');
})
$('#jsbmt').click(function(){
    $('#jsbmt').html('...');

    if($("#inviteLinkI").val().trim() == '')
    {
        $('#iVT').css('color','#F04747');
        $('#iVT').html(`Lien d'invitation - <i style="font-size:10px;">Tu dois entrer un lien d'invitation ou un code d'invitation valide.</i>`)
        $('#jsbmt').html('Rejoindre le serveur');
    
    }else{

    $.post({
        url:'/joinGuild',
        data:{
            invite:$("#inviteLinkI").val().trim()
        },
        success:function(res){
            $('#jsbmt').html('Rejoindre le serveur');
            if(res == '1')
            {
                $('#iVT').css('color','');
                $('#iVT').html(`Lien d'invitation *`)
                window.location.reload();
            }else{
                $('#iVT').css('color','#F04747');
                $('#iVT').html(`Lien d'invitation - <i>L'invitation est invalide ou a expiré.</i>`)
            }
        }
    })
}
})