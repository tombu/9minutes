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
  
  // Search Page
  Path.map(hashbang+search_path+":q").to(function(){
    show_flash(false);
    load_site_request(search_path, this.params['q']);
  });

  // Sign Up Page
  Path.map(hashbang+register_path).to(function(){
    show_flash(false);
    load_site_request(register_path, "");
  });
  
  // Sign In Page
  Path.map(hashbang+login_path).to(function(){
    show_flash(false);
    load_site_request(login_path, "");
  });
  
  // Sign Out Page
  Path.map(hashbang+logout_path).to(function(){
    show_flash(false);
    load_site_request(logout_path, "");
  });
  
  // User Show Page
  Path.map(hashbang+user_path+":user").to(function(){
    show_flash(false);
    load_site_request(user_path, this.params['user']);
  });
});