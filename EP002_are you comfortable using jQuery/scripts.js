$(function(){
    console.log('starting')
    $('.load-info').on('click', function(){
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/artists',
            dataType: 'json'
        }).done(function(data){
            $.each(data.artists, function(key, val){
                $('.info-artists')
                .append('<li>'+val.name+'</li>')
            }); //each
        }); //ajax done
    }); //click event
}); // jQuery Ready