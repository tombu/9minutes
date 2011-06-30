function load_more_request(link, params){
  cacheResponse = cacheRequest(link+params);
  if(!cacheResponse)
  {
    console.info("=> Request to server");
    $.ajax({
      type: "GET",
      dataType: "html",
      url: link,
      data: params,
      error: function(){
        hide_flash(false);
        show_flash(true);
        enable_more_button();
      },
      success: function(data){
        cacheRequest(link+params, data);
        append_to_list(data);
      }
    });
  }
  else 
  {
    console.info("=> Request to jQuery Object");
    append_to_list(cacheResponse);
  }
}

function favourite_request(link, params){
  $.ajax({
    type: "GET",
    dataType: "html",
    url: link,
    data: params,
    error: function(){
      hide_flash(false);
      show_flash(true);
    },
    success: function(data){
      $('#content .heart').addClass('loved');
    }
  });
}

function load_site_request(link, params){
  cacheResponse = cacheRequest(link+params);
  hide_flash(true);
  if(!cacheResponse)
  {
    console.info("=> Request to server");
    $.ajax({
      type:"GET",
      dataType:"html",
      url: link + params,
      error: function(){
        hide_flash(false);
        show_flash(true);
        enable_more_button();
      },
      success: function(data){
        cacheRequest(link+params, data);
        $("#content").html(data);
        $("#content").ready(function(){
          hide_flash(false);
          init_site(link);
        });
      }
    });
  }
  else 
  {
    console.info("=> Request to jQuery Object");
    $("#content").html(cacheResponse);
    $("#content").ready(function(){
      hide_flash(false);
      init_site(link);
    });
  }
}

function album_request(link, params, obj){
  hide_flash(true);
  $.ajax({
    type: "GET",
    dataType: "html",
    url: link,
    data: params,
    error: function(){
      hide_flash(false);
      show_flash(true);
      //enable_more_button();
    },
    success: function(data){
      show_songs_from_album(data, obj);
    }
  });
}

function video_request(link, artist, track, play){
  var params = "artist="+artist+"&track="+track;
  var dat;
  $.ajax({
    type: "GET",
    dataType: "html",
    url: jQuery.trim(link),
    data: params,
    error: function(){
      hide_flash(false);
      show_flash(true);
      //enable_more_button();
      return null;
    },
    success: function(data){
      videoRequestResponse(jQuery.trim(data), artist, track, play);
    }
  });
}