function show_flash(error){
  $load = $('#loading');
  if($load.is(":visible")) return false;

  if(error && !$load.hasClass("error")) $load.addClass("error");
  else if (!error) $load.removeClass("error");

  $load.css({"top": "-40px", "opacity": "0"}).show();
  $load.animate({
    opacity: 1,
    top: 0
  }, 300);
}

function hide_flash(){
  $load = $('#loading');
  if($load.is(":hidden")) return false;

  $load.animate({
    opacity: 0,
    top: -40
  }, 600, function(){$(this).hide()});
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