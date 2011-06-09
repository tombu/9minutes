
// Default paths for application
// DON'T CHANGE!!!
const hashbang = "#!";
const artist_path = "/artists/";
const home_path = "/home";
const charts_path = "/charts";
const search_path = "/search/";
const search_autocomplete_path = "/autocomplete/";

$(document).ready(function(){
  Path.root(hashbang+home_path);
  
  // Setup default AJAX values
  // for future requests
  $.ajaxSetup({
  
    // 30sec timeout for each request
    // timeout: 30000
  });
});