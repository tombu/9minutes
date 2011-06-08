
// Default paths for application
// DON'T CHANGE!!!
const hashbang = "#!";
const artist_path = "/artists/";
const home_path = "/home";
const charts_path = "/charts";

$(document).ready(function(){
  Path.root(hashbang+home_path);
  
  // Setup default AJAX values
  // for future requests
  $.ajaxSetup({
  
    // 30sec timeout for each request
    // timeout: 30000
  });
});