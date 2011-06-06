$(document).ready(function(){
  $('.more').live("click", function(){
    more_hover_out(this);
    loadmore(this);
  });
});


function loadmore(obj){
  show_flash(false);
  
  $(obj).parent().children('.list').attr("wanting","true");
  
  size = $(obj).parent().find('li').size();
  tile = $(obj).parent().children('.list').attr("tile");
  artist = $(obj).parent().parent(".content").attr("artist");
  
  disable_more_button(obj);
  
  $.ajax({
    type: "POST",
    dataType: "script",
    url: "/artists_more_"+tile,
    data: "size="+size+"&artist="+artist,
    error: function(){
      alert("An error has occurred making the request: ");
      show_flash(true);
    },
    success: function(){
      $list = $(".list[wanting=true]");
      $list.removeAttr("wanting");
      hide_flash();
      init_artist();
      enable_more_button();
    }
  });
}

function append_to_list(ctnt){
  $list = $(".list[wanting=true]");
  var c=0;
  $(ctnt).hide().appendTo($list);
  $list.children().each(function(){
    if($(this).is(":hidden"))
    {
      show_li(this, c);
      c+=100;
    }
  });
}

function show_li(obj, c){
  setTimeout(function(){
    $(obj).show();
  }, 200+c);
}