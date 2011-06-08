$(document).ready(function(){

  // Artist Show Page
  Path.map(hashbang+artist_path+":artist").to(function(){
    show_flash(false);
    load_site_request(artist_path, this.params['artist']);
  });
  
  // Home Page
  Path.map(hashbang+home_path).to(function(){
    show_flash(false);
    load_site_request(home_path, "");
  });
  
  // Charts Page
  Path.map(hashbang+charts_path).to(function(){
    show_flash(false);
    load_site_request(charts_path, "");
  });
});