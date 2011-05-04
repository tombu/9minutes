$(document).ready(function(){
  $(".artists li:nth-child(6n)").css("marginRight", 0);
  $(".songs.tab li:nth-child(2n)").css("marginRight", 0);
});

$(window).load(function() {

  // dropdown
  $("div[dropping]").hoverIntent(function(){
    $(this).children(".box").fadeIn(500);
  }, function(){
    $(this).children(".box").fadeOut(300);
  });
  $("div[dropping]").click(function(){
    $(this).children(".box").fadeOut(300);
  });
  
  $("div[dropping] .box li").click(function(){
    $("div[dropping] > span").html($(this).html());
    $("div[dropping] #category").attr("value", $(this).html().toLowerCase());
  });
  
  // set positions
  $(".navigation").each(function(){
    $i = 0;
    $(this).children().each(function(){
      $(this).attr("position", $i);
      $i++;
    });
  });
  
  // add actives
  $('.navigation li:first-child').addClass('active');
  $("div[wheel] > div:first-child").addClass('active');
  
  
  $("ul[steering] li").live("click", function(){
    if($(this).is('.active')) return;
    // VARS	
	  var id = $(this).attr("position");
    var position = $(this).parent().children().index(this);
    $active = $("div[wheel="+wheel+"] > .active");
    var active_id = $active.attr("position");
    var wi = 0;
    var size = $(this).parent().children().size();
    $hiddenElements = [];
    for(var i=0; i<position;i++)
    { wi+=$(this).parent().children("li:eq("+i+")").width(); }
    $x = $(this);
    
    // NAVIGATION HANDLING
    //// active switch
    $(this).parent().children().each(function(){
      $(this).removeClass("active");
      // TODO: weggefadetes active Element bleibt dick
    });
    $(this).addClass("active");
    
    //// animation
    ////// move container
    $(this).parent().animate({
      marginLeft: -wi-5
    }, 300);
    
    ////// move elements
    for(var i=0; i<position;i++)
    {
      $v = $(this).parent().children("li:eq("+i+")");
      $hiddenElements[i] = $v;
      $v.animate({
        opacity: 0
      }, 300, function(){
        $(this).remove();
        $x.parent().css("marginLeft", 0);
      });
      
      $(this).parent().append("<li style='opacity:0;margin-left: 20px;' position='"+$hiddenElements[i].attr('position')+"'>"+$hiddenElements[i].text()+"</li>");
      $(this).parent().children().last().animate({
        opacity: 1,
        marginLeft: 0
      }, 500);
    }
   
   
    var wheel = $(this).parent().attr("steering");
    
    // get ID		
	  var uid = $(this).attr("position");
    $uactive = $("div[wheel="+wheel+"] > .active");
    var active_uid = $uactive.parent().children().index($uactive);
    
    //alert(active_uid + " _ " + id);
    
    $speed = 200;
    $range = 200;
    
    // animation
    if(uid != active_uid)
    {
      $("div[wheel="+wheel+"] > .active").css("left", 0).animate({
        left: -$range,
        opacity: 0
      }, $speed, function(){
        $(this).hide();
        $("div[wheel="+wheel+"] > div:eq("+uid+")").css("left", $range).show().addClass("active").animate({
          left: 0,
          opacity: 1
        }, $speed);
      }).removeClass("active");
    }
      /*
    }
    else if(uid < active_uid)
    {
      $("div[wheel="+wheel+"] > .active").css("left", 0).animate({
        left: $range,
        opacity: 0
      }, $speed, function(){
        $(this).hide();
        $("div[wheel="+wheel+"] > div:eq("+uid+")").css("left", -$range).show().addClass("active").animate({
          left: 0,
          opacity: 1
        }, $speed);
      }).removeClass("active");
    }*/
  });
});


// Overlay
function overlay(id){
    $.blockUI({ 
    	css: {
    		cursor: 'default'
    	},
    	overlayCSS:  { 
    		opacity: 0,
    		cursor: 'default'
  		}, 
  		themedCSS: {
			width:	'388px',
			top:	'17%',
			left:	'50%'
		},
        theme:     true, 
        message:   $(id), 
        timeout:   0,
	    fadeIn:    400, 
	    fadeOut:   300,
	    focusInput: false
    });     
    $(id+" .close").click(function() {
        $.unblockUI(); 
        return false; 
    });
}


/*
$(document).ready(function(){
  $(".artists li:nth-child(6n)").css("marginRight", 0);
  $(".songs.tab li:nth-child(2n)").css("marginRight", 0);  
  
  addActive();
  
  // URL Handling
  $hash = window.location.hash;
  $hash = $hash.substr(1).toUpperCase();
  if ($hash == null) $hash = $('.navigation li a:first-child').html().toUpperCase();
  $hash = "#"+$hash;

});

function addActive(){
  $('.navigation').each(function(){
    $(this).children('li').each(function(){
      $(this).wrapInner('<a href="#'+$(this).html().toUpperCase()+'"></a>');
    });
  });
}

$(window).load(function() {

  // dropdown
  $("div[dropping]").hoverIntent(function(){
    $(this).children(".box").fadeIn();
  }, function(){
    $(this).children(".box").fadeOut();
  });
  
  $("div[dropping] .box li").click(function(){
    $("div[dropping] > span").html($(this).html());
    $("div[dropping] #category").attr("value", $(this).html().toLowerCase());
  });
  
  // set positions
  $(".navigation").each(function(){
    $i = 0;
    $(this).children().each(function(){
      $(this).attr("position", $i);
      $i++;
    });
  });
  
  
  $('.navigation li').removeClass('active');  
  $('.navigation li a[href='+$hash+']').parent().addClass('active');
  $position = $('.navigation a[href='+$hash+']').parent().attr("position");
  //alert($position);
  $("div[wheel] > div:eq("+$position+")").addClass('active');
  
  
  $("ul[steering] li").live("click", function(){
    if($(this).is('.active')) return;
    
    // VARS	
	  var id = $(this).attr("position");
    var position = $(this).parent().children().index(this);
    $active = $("div[wheel="+wheel+"] > .active");
    var active_id = $active.attr("position");
    var wi = 0;
    var size = $(this).parent().children().size();
    $hiddenElements = [];
    for(var i=0; i<position;i++)
    { wi+=$(this).parent().children("li:eq("+i+")").width(); }
    $x = $(this);
    
    // NAVIGATION HANDLING
    //// active switch
    $(this).parent().children().each(function(){
      $(this).removeClass("active");
      // TODO: weggefadetes active Element bleibt dick
    });
    $(this).addClass("active");
    
    //// animation
    ////// move container
    $(this).parent().animate({
      marginLeft: -wi-5
    }, 300);
    
    ////// move elements
    for(var i=0; i<position;i++)
    {
      $v = $(this).parent().children("li:eq("+i+")");
      $hiddenElements[i] = $v;
      $v.animate({
        opacity: 0
      }, 300, function(){
        $(this).remove();
        $x.parent().css("marginLeft", 0);
      });
      
      $(this).parent().append("<li style='opacity:0;margin-left: 20px;' position='"+$hiddenElements[i].attr('position')+"'><a href='#"+$hiddenElements[i].text().toUpperCase()+"'>"+$hiddenElements[i].text()+"</a></li>");
      $(this).parent().children().last().animate({
        opacity: 1,
        marginLeft: 0
      }, 500);
    }
   
   
    var wheel = $(this).parent().attr("steering");
    
    // get ID		
	  var uid = $(this).attr("position");
    $uactive = $("div[wheel="+wheel+"] > .active");
    var active_uid = $uactive.parent().children().index($uactive);
    
    //alert(active_uid + " _ " + id);
    //alert(wheel);
    $speed = 200;
    $range = 200;
    
    // animation
    if(uid != active_uid)
    {
      $("div[wheel="+wheel+"] > .active").css("left", 0).animate({
        left: -$range,
        opacity: 0
      }, $speed, function(){
        $(this).hide();
        $("div[wheel="+wheel+"] > div:eq("+uid+")").css("left", $range).show().addClass("active").animate({
          left: 0,
          opacity: 1
        }, $speed);
      }).removeClass("active");
    }
  });
  
  
  
});
*/