$(document).ready(function(){
  $('.heart').live("click", function(){
    var params = "id="+$('#content .tabs .content').attr('q');
    favourite_request(favourite_path, params);
  });
  
}); 