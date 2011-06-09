function load_more_request(link, params){
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
      append_to_list(data);
    }
  });
}

function load_site_request(link, params){
  hide_flash(true);
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
      $("#content").html(data);
      $("#content").ready(function(){
        hide_flash(false);
        init_site(link);
      });
    }
  });
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

function video_request(link, params, obj){
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
      playTrack(data, obj);
    }
  });
}