$(document).ready(function() {
  $('#full').live("click",function(){
    if($(this).hasClass("open")) {
      $("#fullscreen").animate({
        marginTop: -300,
        opacity: 0
      }, 500, function(){
        $(this).hide();
        $("#site, #bg_stripe").show().animate({
          marginTop: 0,
          opacity: 1
        }, 500);
        $("#fullscreen_wrap").fadeTo(500, 0, function(){$(this).hide();});
      });
      $(this).removeClass("open");
    }
    else {
      $("#site, #bg_stripe").animate({
        marginTop: 400,
        opacity: 0
      }, 500, function(){
        $(this).hide();
        $("#fullscreen").css("marginTop", -100).show().animate({
          marginTop: 120,
          opacity: 1
        }, 500);
        init_playlist_scrollbar();
        $("#fullscreen_wrap").fadeTo(1000, 0.5);
      });
      $(this).addClass("open");
    }
  });
});