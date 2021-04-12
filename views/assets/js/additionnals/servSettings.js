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