function show_flash(error){
  $load = (error) ? $('#error') : $('#loading');
  if($load.is(":visible")) return false;

  $load.css({"top": "-40px", "opacity": "0"}).show();
  $load.animate({
    opacity: 1,
    top: 0
  }, 300);
  if (!error) $('#block').show().fadeTo(400, 0.3);
}

function hide_flash(error){
  $load = (error) ? $('#error') : $('#loading');
  if($load.is(":hidden")) return false;

  $load.animate({
    opacity: 0,
    top: -40
  }, 600, function(){$(this).hide()});
  
  if (!error) $('#block').fadeTo(300, 0, function(){ $(this).hide();});
}



function more_hover(){
  $('.more').hover(function(){
    $(this).animate({
      backgroundColor: "#0086cc",
      color: "#ffffff"
    }, 200);
  }, function(){
    more_hover_out(this);
  });
}

function more_hover_out(obj){
  $(obj).stop().animate({
    backgroundColor: "#f4f6f9",
    color: "#15191d"
  }, 100);
}

function init_playlist_scrollbar(){
  $('#fullscreen .play_list').jScrollPane();
  
  $('#fullscreen .play_list').hover(function(){
    $('#fullscreen .jspVerticalBar').stop().fadeTo(300, 1);
  }, function(){
    $('#fullscreen .jspVerticalBar').stop().fadeTo(200, 0.02);
  });
}