
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
var favourite_path = "/favourize";
var search_video_path = "/search_video";

// root title
var documentTitle = "9minutes";

$(document).ready(function(){
  // home site
  Path.root("#!/home");
  
  // initialize path listener
  Path.listen();

  // redirect non existent links
  // to the 404 page
  Path.rescue(function(){
    // TODO: link to 404 page
    alert("404: Route Not Found");
  });
  
  // Setup default AJAX values
  // for future requests
  $.ajaxSetup({
  
    // 30sec timeout for each request
    // timeout: 30000
  });
});