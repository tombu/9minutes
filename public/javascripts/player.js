// CLICK HANDLER
$(document).ready(function(){
  $('.play').live('click', playVideo);
  $('.pause').live('click', pauseVideo);
  
  $('.volume').live('click', muteVideo);
  $('.novolume').live('click', unMuteVideo);
  
  
  $('#scrubbar').rangeinput({
    progress: true,
    speed: 200
  });
});


function playControl(play){
  if(play)
    $('.play').addClass("pause").removeClass("play");
  else
    $('.pause').addClass("play").removeClass("pause");
}

function volumeControl(mute){
  if(mute)
    $('.volume').addClass("novolume").removeClass("volume");
  else
    $('.novolume').addClass("volume").removeClass("novolume");
}