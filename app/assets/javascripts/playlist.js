var fullscreenInt;

$(document).ready(function(){
  $('#playlist .el').live('click', function(){
    playTrack(getVid(this), getArtist(this), getTrack(this));
  });

  $('.player .forward').live('click', function(){
    nextVideo();
  });
  $('.player .backward').live('click', function(){
    prevVideo();
  });
});

function initPlaylist() {
  storage = $.store.get("9minutesPlaylist");
  if(storage !== undefined) {
    size = storage.length;
    for(i = 0; i < size; i++) {
      addTrack(storage[i].videoid, storage[i].artist, storage[i].title, false);
    }
  }
  
  //if($('#playlist .el').size() > 0)
  //  fullscreenInt = setInterval ( "showFullscreen(true)", 15000 );
}

function savePlaylist() {
  var tracks = [];
  $('#playlist .el').each(function(i) {
    tracks[i] = {
      title     : getTrack(this),
      artist    : getArtist(this),
      videoid   : getVid(this)
    }
  });

  $.store.set("9minutesPlaylist", tracks);
}

function addTrack(url, artist, track, save){
  var appendData = "<div class='el' vid='"+url+"'><h3><div>"+track+"</div><span>"+artist+"</span></h3></div>";
  if(save) 
  {
    $('#playlist .jspPane').append(appendData);
    savePlaylist();
  }
  else
    $('#playlist').append(appendData);
}



function getArtist(obj) {
  return $(obj).children('h3').children('span').text();
}
function getTrack(obj) {
  return $(obj).children('h3').children('div').text();
}
function getVid(obj) {
  return $(obj).attr('vid');
}


function setCurrentSong(vid) {
  var me = $('#playlist .el[vid="'+vid+'"]');
  var id = $(me).parent().children().index(me);
  $('#playlist .el').each(function(){
    $(this).removeClass("active");
  });
  $('#playlist .el:eq('+id+')').addClass("active");
}