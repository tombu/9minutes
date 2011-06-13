
// Default paths for application
// DON'T CHANGE!!!
var hashbang = "#!";
var artist_path = "/artists/";
var home_path = "/home";
var charts_path = "/charts";
var search_path = "/search/";
var search_autocomplete_path = "/autocomplete/";
var user_path = "/users/";
var register_path = "/register";
var login_path = "/login";
var logout_path = "/logout";

$(document).ready(function(){
  Path.root(hashbang+home_path);
  
  // Setup default AJAX values
  // for future requests
  $.ajaxSetup({
  
    // 30sec timeout for each request
    // timeout: 30000
  });
});