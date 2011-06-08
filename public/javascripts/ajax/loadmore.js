$(document).ready(function(){
  $('.more').live("click", function(){
    hide_flash(false);
    hide_flash(true);
    
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
  
  url = "/"+tile;
  params = "size="+size+"&artist="+artist;
  
  load_more_request(url, params);
}

function append_to_list(ctnt){
  $list = $(".list[wanting=true]");
  var c=0;
  $(ctnt).hide().appendTo($list);
  
  $list.children().each(function(){
    if($(this).is(":hidden"))
    {
      show_li(this, c);
      c+=30;
    }
  });
  
  $list.removeAttr("wanting");
  hide_flash();
  init_artist();
  enable_more_button();
}

function show_li(obj, c){
  setTimeout(function(){
    $(obj).show();
  }, 200+c);
}