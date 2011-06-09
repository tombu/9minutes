$(document).ready(function(){
  loadPlayer();
  initPlaylist();
  makeTracksAddable(); // bind click-event to "add" button (for each track)
  initPlayer();
  initPlayTrack();
});


function initPlayer(){
  $('.play').live('click', function(){
    if($(this).hasClass('pause')) pauseVideo();
    else playVideo();

    $(this).toggleClass('pause');
  });
}


function initPlayTrack(){
  $('.playsong').live('click',function(){
    url = "/search_video";
    params = "artist="+$(this).parents('li').attr("artist")+"&track="+$(this).parents('li').attr("track");
    video_request(url, params, this);
  });
}

function playTrack(data, obj){
  loadVideo(data);
  $('#fullscreen h2').text($(obj).parents('li').attr("artist"));
  $('#fullscreen h1').text($(obj).parents('li').attr("track"));
}


function initPlaylist() {
  // TODO: reload Playlist form localStorage
  storage = $.store.get("9minutesPlaylist");
  if(storage !== undefined) {
    size = storage.length;
    for(i = 0; i < size; i++) {
      $('.play_list').append('<li videoid="'+ storage[i].videoid + '"><h3><div>'+ storage[i].title + '</div><span>' + storage[i].artist + '</span></h3></li>');
      $listElement = $('.play_list li:eq('+i+')');
      //$listElement.prepend('<img class="delete-handle" src="/images/ico/delete.png" />');
      //$listElement.append('<img class="drag-handle" src="/images/ico/drag.png" />');
    }
  }
/*
  $('ul#playlist').dragsort({
      dragSelector: '.drag-handle',
      dragEnd: savePlaylist,
      placeHolderTemplate: '<li class="placeholder">',
      scrollContainer: '#playlist-container'
  });

  $('#playlist .delete-handle').live("click", onRemoveTrackFromPlaylist);

  $('#player #icons .playlist').live("click", function(){
    $('#playlist-container').toggle();
  });

  $('#playlist-navigation .clear').live('click', function(){
    $('#playlist li').remove();
    $.store.clear();
  });*/
}

function savePlaylist() {
  var tracks = [];
  $('.play_list li').each(function(i) {
    tracks[i] = {
      title     : $(this).attr("track"), // TODO
      artist    : $(this).attr("artist"),
      videoid   : $(this).attr('videoid')
    }
  });

  //console.log(tracks);
  $.store.set("9minutesPlaylist", tracks);
  //console.log("playlist saved ;)");
}

function makeTracksAddable() {
  $('.add').live("click", onAddTrackToPlaylist);
}

function onAddTrackToPlaylist(event) {
  // if already in playlist
  $listElement = $(event.target).parents('li').clone(); // TODO
  $vuid = $listElement.children('.play').attr('videoid');


  if ($('#playlist li[videoid='+$vuid+']').html() != null)
  {
    alert("Already in playlist!");
    return;
  }

  $listElement.children('img').remove();
  $listElement.attr('data-itemidx', 0); // important for dragsort plugin
  $listElement.attr('videoid', $vuid);
 // $listElement.prepend('<img class="delete-handle" src="/images/ico/delete.png" />');
 // $listElement.append('<img class="drag-handle" src="/images/ico/drag.png" />');
  $listElement.appendTo('#playlist');
  
  savePlaylist();
}

function onRemoveTrackFromPlaylist(event) {
  $listElement = $(event.target).parent();
  $listElement.fadeTo(300, 0.1, function() {
    $(this).hide("blind", function() { 
      $(this).remove();
      savePlaylist();
    });
  });
}