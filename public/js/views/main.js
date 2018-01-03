$(document).ready(function() {

    // Timeout 이벤트
    var e_clearTiemout;    

    // city
    $(".city-spot").hover(function() {    
        setTimeout(function() {
            $(".city-spot").attr('src','/img/heart_spot_small_on_2.png');
            refresh_board();
        }, 300);    
        e_clearTiemout = setTimeout(function() {
            $(".city-spot").attr('src','/img/heart_spot_small.png');
        }, 1000);                            
                
    },function() {       
        clearTiemout(e_clearTiemout);
        setTimeout(function() {
            $(".city-spot").attr('src','/img/heart_spot_small.png');
        }, 300);  
    });   

    // lang
    $(".lang").click(function() {
        $(".lang-body").html($(this).find("span").html());
    });
    

    //fnCtlPicCount(3);

    $( window ).resize(function() {
       //fnCtlPicCount(3);
    });
});

//
function fnCtlPicCount(num) {

    var m = window.matchMedia("screen and (max-width: 768px)");
    
    if(m.matches) {                
        var num = 2;
    }

    // 한줄에 들어가는 사진 수 조정.
    var row_placeholder = $(".city-main-board .row.placeholder");          
    
    console.log(row_placeholder.length);
     for(var i = 0; i < row_placeholder.length; i++) {
         if(i%num == 0) {            
             console.log(i);    
         } else {
             $(row_placeholder[i]).hide();
         }
    }
}

// city board
function refresh_board() {
    $(".city-main-board h1").html("Busan");
    
}

// .row.placeholder

