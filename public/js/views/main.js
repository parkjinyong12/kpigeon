$(document).ready(function() {

    $(".city-spot").hover(function() {
        $(".city-spot").attr('src','/img/heart_spot_small_on_2.png');
    },function() {     
        $(".city-spot").attr('src','/img/heart_spot_small.png');
    });  
  
});


