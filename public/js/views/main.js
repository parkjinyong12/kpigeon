$(document).ready(function() {
    $(".transport").hover(function() {
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