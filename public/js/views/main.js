$(document).ready(function() {

    // city
    $(".city-spot").hover(function() {
        $(this).attr('src','/img/heart_spot_small_on_2.png');
    },function() {
        $(this).attr('src','/img/heart_spot_small.png');
    });

    // lang
    $(".lang").click(function() {
        $(".lang-body").html($(this).find("span").html());
    });

    $(".travel").hover(function() {
        $('body').css('backgroundColor','yellow');
    },function() {
        $('body').css('backgroundColor','white');
    });

    $(".seesight").hover(function() {
        $('body').css('backgroundColor','green');
    },function() {
        $('body').css('backgroundColor','white');
    });

    $(".culture").hover(function() {
        $('body').css('backgroundColor','blue');
    },function() {
        $('body').css('backgroundColor','white');
    });

    $(".accommodation").hover(function() {
        $('body').css('backgroundColor','red');
    },function() {
        $('body').css('backgroundColor','white');
    });
});