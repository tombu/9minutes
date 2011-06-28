
// Default paths for application
// DON'T CHANGE!!!
var hashbang = "#!";
var artist_path = "/artists/";
var home_path = "/home";
function init_home(){
  $('#top_artist').nivoSlider({
    controlNav: false,
    pauseTime: 3000
  });
  $('#top_artist_nav .dir').hover(function(){
    $(this).children("img").stop().fadeTo(300, 0.15);
  }, function(){
    $(this).children("img").stop().fadeTo(300, 0.4);
  });
}