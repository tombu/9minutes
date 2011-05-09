// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
	google.load("swfobject", "2.1");

	var active = null;
	  /*
	   * Chromeless player has no controls.
	   */
   var updateInterval = 0;
   var dragging = false;

	  // Update a particular HTML element with a new value
	  function updateHTML(elmId, value) {
		document.getElementById(elmId).innerHTML = value;
	  }

	  // This function is called when an error is thrown by the player
	  function onPlayerError(errorCode) {
		alert("An error occvured of type:" + errorCode);
	  }

	  // This function is called when the player changes state
	  function onPlayerStateChange(newState) {
		updateHTML("playerState", newState);
	  }

	  // Display information about the current state of the player
	  function updatePlayerInfo() {
		// Also check that at least one function exists since when IE unloads the
		// page, it will destroy the SWF before clearing the interval.
		if(ytplayer && ytplayer.getDuration) {
		  updateHTML("duration", getTimeFromInt(ytplayer.getDuration()));
		  updateHTML("currentTime", getTimeFromInt(ytplayer.getCurrentTime()));
      /*
		  updateHTML("bytesTotal", ytplayer.getVideoBytesTotal());
		  updateHTML("startBytes", ytplayer.getVideoStartBytes());
		  updateHTML("bytesLoaded", ytplayer.getVideoBytesLoaded());*/
      
      if(!dragging)
      {
        var api = $("#scrubbar input").data("rangeinput");
        var crnt = (parseInt(ytplayer.getCurrentTime()) / parseInt(ytplayer.getDuration())) * 100;
        $("#scrubbar input").data("rangeinput").setValue(crnt);
      }
		}
	  }


	  // Allow the user to set the volume from 0-100
	  function setVideoVolume(volume) {
      if(isNaN(volume) || volume < 0 || volume > 100) {
        alert("Please enter a valid volume between 0 and 100.");
      }
      else if(ytplayer){
        ytplayer.setVolume(volume);
      }
	  }
    
    function duration(){
      if (ytplayer) {
        ytplayer.getDuration();
      }
    }
    function currentTime(){
      if (ytplayer) {
        ytplayer.getCurrentTime();
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
		  ytplayer.mute();
		}
	  }

	  function unMuteVideo() {
		if(ytplayer) {
		  ytplayer.unMute();
		}
	  }
    
    function seek(sec){
      if(ytplayer) {
        sec = (sec / 100) * parseInt(ytplayer.getDuration());
        ytplayer.seekTo(sec, true);
      }
    }
    
    function startDraggingTime(){
      dragging = true;
    }
    function stopDraggingTime(){
      dragging = false;
    }
    
    
    function startUpdate(){
      updateInterval = setInterval(updatePlayerInfo, 250);
    }
    function stopUpdate(){
      clearInterval(updateInterval);
    }
	  // Loads the selected video into the player.
function loadVideo(vid) {
  var videoID = vid;
  if(ytplayer) {
	ytplayer.loadVideoById(videoID);
  }
  active = videoID;
  $li = activeVid();
  $('#playlist li').each(function(){
	$(this).removeClass("active");
  });
  $li.addClass("active");
}

	  // This function is automatically called by the player once it loads
	  function onYouTubePlayerReady(playerId) {
      ytplayer = document.getElementById("ytPlayer");
      // This causes the updatePlayerInfo function to be called every 250ms to
      // get fresh data from the player
      startUpdate();
      updatePlayerInfo();
      ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
      ytplayer.addEventListener("onError", "onPlayerError");
      //Load an initial video into the player
      ytplayer.cueVideoById("sCziT0ZWBDQ");
	  }

	  // The "main method" of this sample. Called when someone clicks "Run".
	  function loadPlayer() {
      // Lets Flash from another domain call JavaScript
      var params = { allowScriptAccess: "always" };
      // The element id of the Flash embed
      var atts = { id: "ytPlayer" };
      // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
      swfobject.embedSWF("http://www.youtube.com/apiplayer?version=3&enablejsapi=1", 
                "videoDiv", "50", "28", "8", null, null, params, atts);
	  }
	  function _run() {
		loadPlayer();
	  }
	  google.setOnLoadCallback(_run);

	function addVideo(vid, name) 
	{
		$('#playlist').append('<li vid="'+vid+'"><a href="javascript:void(0);" onclick="loadVideo(\''+vid+'\');">'
		+name+'</a> <a class="del" onclick="deleteVid(\''+vid+'\');">(X)</a></li>');
	}

	function nextVideo()
	{
		$e = activeVid();
		$next = $e.next('li');
		if($next != null) 
		{
			loadVideo($next.attr('vid'));
		}
		//$(this).parent().children().index(this);
	}
	function prevVideo()
	{
		$e = activeVid();
		$prev = $e.prev('li');
		if($prev != null) 
		{
			loadVideo($prev.attr('vid'));
		}
		//$(this).parent().children().index(this);
	}

	function activeVid()
	{
		return $('#playlist [vid='+active+']');
	}
	
	function deleteVid(vid)
	{
		$('#playlist [vid='+vid+']').remove();
	}
	
	function changeSize()
	{
		//$('object').width($('object').width()+40);
		//$('object').height($('object').height()+30);
		$extend = 100;
		$extendy = 100;
		
		$('#ytplayer').width($('ytplayer').width()+40);
		$('#ytplayer').height($('ytplayer').height()+40);
	
	}
	
	$(document).ready(function(){
		$("#changesize").live("click", function(){
			changeSize();
		});
	});