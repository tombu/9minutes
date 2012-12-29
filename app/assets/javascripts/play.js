$(document).ready(function(){

  $('.playsong').live("click", function(){
    videoRequest(this, true);
  });
  $('.addsong').live("click", function(){
    videoRequest(this, false);
  });
  
});

function videoRequest(me, play) {
  var artist = $(me).parent().attr("artist");
  var track = $(me).parent().attr("track");
  video_request(search_video_path, artist, track, play);
}

function videoRequestResponse(data, artist, track, play) {
  if(play)
    playTrack(data, artist, track);
  else
    addTrack(data, artist, track, true);
}


function playTrack(url, artist, track){
  loadVideo(url);
  $('#fullscreen h2').text(artist);
  $('#fullscreen h1').text(track);
 // $('#fullscreen 
}