$(document).ready(function(){
  Path.map("#!/:artist").to(function(){
    show_flash(false);
    
    var artist = this.params['artist'];
    
    $.ajax({
      type:"GET",
      dataType:"script",
      url: "/artists/" + artist,
      error: function(){
        hide_flash();
        show_flash(true);
      }
    });
  });
});