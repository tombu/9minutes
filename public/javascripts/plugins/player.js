var active = null;

function updateHTML(elmId, value) {
  document.getElementById(elmId).innerHTML = value;
}

function onPlayerError(errorCode) {
  alert("An error occured of type:" + errorCode);
}

function onPlayerStateChange(newState) {
  switch(newState) {
    case 1: // PLAY
      playControl(true);
      break;
    case 2: // PAUSE
    case 5:
      playControl(false);
      break;
    case 0:
      playControl(false);
      nextVideo();
      break;
  }
  
}

function updatePlayerInfo() {
  if(ytplayer && ytplayer.getDuration) {
    var crnt = (parseInt(ytplayer.getCurrentTime()) / parseInt(ytplayer.getDuration())) * 100;
    $(".sidebar #scrubbar").data("rangeinput").setValue(crnt);
  }
}

function playVideo() {
  if (ytplayer) {
	ytplayer.playVideo();
  }
}

function pauseVideo() {
  if (ytplayer) {
    ytplayer.pauseVideo();
  }
}

function muteVideo() {
  if(ytplayer) {
    volumeControl(true);
    ytplayer.mute();
  }
}

function unMuteVideo() {
  if(ytplayer) {
    volumeControl(false);
    ytplayer.unMute();
  }
}



function nextVideo()
{
  $e = activeVid();
  $next = $e.next('div');
  if($next.html() != null) 
    loadVideo($next.attr('vid'));
  else loadVideo($('#playlist .el:first-child').attr('vid'));
}

function prevVideo()
{
  $e = activeVid();
  $prev = $e.prev('div');
  if($prev.html() != null) 
    loadVideo($prev.attr('vid'));
  else loadVideo($('#playlist .el:last-child').attr('vid'));
  //$(this).parent().children().index(this);
}






function loadVideo(vid) {
  ytplayer.loadVideoById(vid);
  
  active = vid;
  setCurrentSong(vid);
  /*
  active = videoID;
  $li = activeVid();
  $('#playlist li').each(function(){
  $(this).removeClass("active");
  });
  $li.addClass("active");

  $('#track .artist').text($li.children('a').text());
  $('#track .track').text($li.children('span').text());*/
}






// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("ytPlayer");
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  setInterval(updatePlayerInfo, 250);
  updatePlayerInfo();
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
  //Load an initial video into the player
  ytplayer.cueVideoById("sEOLtJZjnEA");
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
					 "&enablejsapi=1&playerapiid=player1", 
					 "video", "640", "360", "8", null, null, params, atts);
}

function _run() {
  loadPlayer();
  $('#fullscreen').css("top", -9999);
}



function activeVid()
{
  $x = $('#playlist .el[vid='+active+']');
  return ($x==null) ? '' : $x;
}