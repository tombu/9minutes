$(document).ready(function() {
  initPlaylist();
});


// init tabs navigation
function init_tabs(){
  $('.tabs_js').each(function(){
    $tabs = $(this);
    $content = $tabs.children('.content').children("div");
    $nav = $tabs.children('.nav').children("li");
    // show first tab
    $nav.first().addClass("active");
    $content.first().show();
  
    // tab click handler
    $nav.bind("click", function() {
      if($(this).hasClass("active")) return false;
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      
      $ctn = $(this).parent().next(".content").children("div");
      $new_ctn = $ctn.eq(get_index(this));
      $ctn.hide();
      $new_ctn.show();
      
      return false;
    });
  });
}


// add controls to songs
function add_controls(){
  $('.list.songs').each(function(){
    $(this).children("li").each(function(){
      if(!$(this).has(".playsong").length)
        $(this).prepend('<a class="playsong"/><a class="addsong" href="javascript:void(0);" />');
    });
  });
}



function init_artist(){
  add_controls();
  add_more_button();
  new_albums();
  margin_fixes();
  remove_links_from_description();
}


// get index of an element
function get_index(obj){
  return $(obj).parent().children().index(obj);
}


// redirect to submit
function submit_redirect(obj){
  $(obj).next("input[type=submit]").click();
}


function add_more_button(){
  $('.list').each(function(){
    if($(this).hasClass("andmore") && !$(this).parent().has(".more").length)
        $(this).after('<br class="clean"/><a class="more">SHOW MORE</a>');
  });
  more_hover();
}


function margin_fixes(){
  $('.list.related li:nth-child(3n)').css("marginRight", 0);
  $('.list.related li img').each(function(){
    $(this).imgscale({ scale: "fill"});
  });
}



function remove_links_from_description(){
  $("#artist_info a").each(function(){
    $text = $(this).html();
    $(this).after($text).remove();
  });
}


function new_albums(){
  album_hover();
  album_add_show_songs_button();
}


function album_hover(){
  $('.albums .img').hover(function(){
    if(!$(this).children(".playall").hasClass("playall"))
      $(this).append('<div class="playall"><a href="javascript:void(0);"></a></div>');
    $(this).find('.playall').fadeIn(200);
  }, function(){
    $(this).find('.playall').stop().fadeOut(300, function(){ $(this).remove(); });
  });
}

function album_add_show_songs_button(){
  $('.albums > li').each(function(){
    if(!$(this).has(".songsbtn").length)
      $(this).append('<a class="songsbtn" href="javascript:void(0);" onclick="load_songs_from_album(this);">Songs</a>');
  });
}


function init_site(link){
  Path.listen();
  
  switch(link) {
    case artist_path:
      init_tabs();
      init_artist();
      break;
    case home_path:
      init_home();
      set_active_navigation(home_path);
      break;
    case charts_path:
    case search_path:
      init_tabs();
      add_more_button();
      add_controls();
      init_autocomplete();
      set_active_navigation(charts_path);
      break;
    case user_path:
    case register_path:
      init_tabs();
      set_active_navigation(register_path);
      break;
    case login_path:
      init_tabs();
      set_active_navigation(home_path);
  }
}


function set_active_navigation(text){
  text = text.replace("/","");
  $('#navigation li.active').removeClass("active");
  $('#navigation li').each(function(){
    if($(this).children("a").html() == text)
      $(this).addClass("active");
  });
}