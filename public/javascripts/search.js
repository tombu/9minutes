$(document).ready(function(){
  $("#search_form .text").autocomplete('', {
    width: 300,
    multiple: true
  });
});

function init_autocomplete(){
  $("#search_bar .text").autocomplete('', {
    width: 300,
    multiple: true
  });
}