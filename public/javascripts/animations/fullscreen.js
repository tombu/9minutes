$(document).ready(function() {
  $('.full').live("click",function(){
    showFullscreen(false);
  });
  $("#fullscreen_close").click(function(){
    showFullscreen(false);
  });
});

function showFullscreen(auto){
    /*if(auto && $('.full').hasClass("open"))
    {
      clearInterval(fullscreenInt);
      return;
    }*/
    
    if($('.full').hasClass("open")) {
      $('#fullscreen').css("top", 0);
      $("#fullscreen").animate({
        marginTop: -400,
        opacity: 0
      }, 500, function(){
        $('#ytPlayer').css("marginTop", -9999);
        $("#site, #bg_stripe").show().animate({
          marginTop: 0,
          opacity: 1
        }, 500);
        $("#fullscreen_wrap").fadeTo(500, 0, function(){$(this).hide();});
        $("#fullscreen_close").fadeTo(500, 0);
      });
      $('.full').removeClass("open");
      //fullscreenInt = setInterval ( "showFullscreen(true)", 15000 );
    }
    else {
      $('#fullscreen').css("top", 0);
      $("#site, #bg_stripe").animate({
        marginTop: 400,
        opacity: 0
      }, 500, function(){
        $(this).hide();
        $('#ytPlayer').css("marginTop", 0);
        $("#fullscreen").css("marginTop", -100).show().animate({
          marginTop: 120,
          opacity: 1
        }, 500);
        init_playlist_scrollbar();
        $("#fullscreen_wrap").fadeTo(1000, 0.5);
        $("#fullscreen_close").fadeTo(500, 1);
      });
      $('.full').addClass("open");
    }
}