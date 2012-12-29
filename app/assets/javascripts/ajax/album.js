
function load_songs_from_album(obj){
  if($(obj).attr("loaded") == "true")
  {
    $('#album_box').fadeOut(200);
    $(obj).removeAttr("loaded");
  }
  else
  {
    $(obj).parent().parent().children().each(function(){
      $(this).children("a").removeAttr("loaded");
    });
    $(obj).attr("loaded", "true");
    artist = $(obj).parent().attr("artist");
    album = $(obj).parent().attr("album");
    
    url = "/album_info";
    params = "artist="+artist+"&album="+album;
  
    album_request(url, params, obj);
  }
}

function show_songs_from_album(data, obj){
  $('#album_box').remove();
  $(obj).parent().prepend(data);
  $('#album_box').fadeIn(200);
  $('#album_box .wrap').jScrollPane();
  
  $('#album_box li').each(function(){
    if(!$(this).has(".play").length)
      $(this).prepend('<a class="play"/><a class="add" href="javascript:void(0);" onclick="open_playlists(this);"/>');
  });
}