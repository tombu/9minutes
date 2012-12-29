
// pinify 9minutes
// Jumplist entries, media controls, ...
// for IE9

$(document).ready(function(){
  
  // Make site pinable
  $("head").pinify({ 
    applicationName: "9minutes", 
    favIcon: "/favicon.ico", 
    navColor: "#0294df", 
    startUrl: "http://localhost:3000", 
    tooltip: "9minutes", 
    window: "width=1024;height=600"
  }); 
 
  // add jumplist
  var stepsArray = ["Charts 1", "Charts 2"];
  gemerateJumplist(stepsArray, "Charts");
  
  
  // Media controls
  $.pinify.createThumbbarButtons({ 
    buttons: [{ 
        icon: "/favicon.ico",
        name: "Twitter",
        click: function () { 
            alert("Link 1");
        } 
    }, 
    {
        icon: "/favicon.ico",
        name: "Facebook", 
        click: function () { 
            alert("Link 2");
        } 
     }] 
  }); 
});


function gemerateJumplist(arr, title){
  var stepsListArray = [];

  // Generate jumplist for navigation
  arr.foreach(function (key, val) {
    var item = { 
      'name': val, 
      'url': "http://localhost:3000",
      'icon': "/favicon.ico"
    }; 
    stepsListArray.push(item); 
  }); 
  
  // Apply jumplist entries
  $.pinify.addJumpList({ 
    title: title,
    items: stepsListArray 
  }); 
}