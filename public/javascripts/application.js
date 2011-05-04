

$(document).ready(function(){
  fixLists(); // fix margins for displaying the lists correctly
});

$(window).load(function() {
  initSearchDropdown(); // dropdown for the search input
  initNavigation(); // set positions and :active for navigation elements
  handleNavigation(); // handle animations and content switch
});












// search dropdown
function initSearchDropdown()
{
  $("div[dropping]").hoverIntent(function(){
    $(this).children(".box").fadeIn(500);
  }, function(){
    $(this).children(".box").fadeOut(300);
  });
  $("div[dropping] .box").live("click", function(){
    $(this).children(".box").fadeOut(300);
  });
  
  $("div[dropping] .box li").live("click", function(){
    $("div[dropping] > span").html($(this).html());
    $("div[dropping] #category").attr("value", $(this).html().toLowerCase());
  });
}

// list fixes
function fixLists()
{
  $(".artists li:nth-child(6n)").css("marginRight", 0);
  $(".songs.tab li:nth-child(2n)").css("marginRight", 0);
}

// set positions for navigation elements
function initNavigation()
{
  // add positions
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
}

// Overlay
function overlay(id)
{
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

// navigation handling
function handleNavigation()
{
  $("ul[steering] li").live("click", function(){
    if($(this).is('.active')) return;
    
    // VARS
    $settings           = [];
    $fadeOutWidth       = 0;
    $settings['nav']    = $(this).parent();
    $settings['newpos'] = $settings['nav'].children().index(this);
    $settings['oldpos'] = $(this).attr("position");
    $settings['wheel']  = $settings['nav'].attr("steering");
    
    // get the width of the navigation elements which will fade out
    for(var i=0; i<$settings['newpos'];i++){ 
      $fadeOutWidth += $settings['nav'].children("li:eq("+i+")").width(); 
    }
    
    // change :active
    $settings['nav'].children().removeClass("active");
    $(this).addClass("active");
    
    // move navigation container
    $settings['nav'].animate({
      marginLeft: -$fadeOutWidth-5
    }, 300);

    // move navigation elements
    for(var i=0; i<$settings['newpos'];i++){
      $element = $settings['nav'].children("li:eq("+i+")");
      $element.animate({
        opacity: 0
      }, 300, function(){
        $(this).remove();
        $settings['nav'].css("marginLeft", 0);
      });
      
      $settings['nav'].append("<li style='opacity:0;margin-left: 20px;' position='"+$element.attr('position')+"'>"+$element.text()+"</li>");
      $settings['nav'].children().last().animate({
        opacity: 1, marginLeft: 0
      }, 500);
    }

    $speed = 200;
    $range = 200;
    
    // animation for content
    $("div[wheel="+$settings['wheel']+"] > .active").css("left", 0).animate({
      left: -$range, opacity: 0
    }, $speed, function(){
      $(this).hide();
      $("div[wheel="+$settings['wheel']+"] > div:eq("+$settings['oldpos']+")").css("left", $range).show().addClass("active").animate({
        left: 0, opacity: 1
      }, $speed);
    }).removeClass("active");
  });
}