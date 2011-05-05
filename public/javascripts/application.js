

$(document).ready(function(){
  fixLists(); // fix margins for displaying the lists correctly
  
  initNavigation(); // set positions and :active for navigation elements
  handleNavigation(); // handle animations and content switch
  orderNavigation(); // order if predefined category
  
  onImageError(); // replace broken image links with placeholders
});

$(window).load(function() {
  initSearchDropdown(); // dropdown for the search input
	fitArtistImages(); // resize and resposition images (artists, album)
});









function fitArtistImages() {
	$("ul.artists img").each(function() {
		$(this).wrap("<div />");
		divWidth = 147, divHeight = 94;
		
		// use this instead of $(this).width(); because .width() of hidden images is zero!
		width = this.width;
		height = this.height;

		if( width < divWidth ) {
			scaleRatio = width / divWidth;
			width = divWidth;
			height /= scaleRatio;
		}
		
		if ( height < divHeight ) {
			scaleRatio = height / divHeight;
			height = divHeight;
			width /= scaleRatio;
		}
				
		posX = - (width - divWidth) / 2;
		posY = - (height - divHeight) / 8;
				
		$(this).css({
			"position" : "absolute",
			"width" : width,
			"height" : height,
			"top" : posY,
			"left" : posX
		});
	});
}


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
  // add positions and hash control
  $(".navigation").each(function(){
    $i = 0;
    $(this).children().each(function(){
      $(this).attr("position", $i);
      $(this).attr("hashcontrol", $(this).text().replace(" ","+").toLowerCase());
      $i++;
    });
  });
  
  // add actives
  $str = $.deparam.fragment(window.location.href);
  $active = $(".navigation li[hashcontrol="+$str.category+"]");
  if($active.text() == "" || $active == null) $id = 0;
  else $id = $active.parent().children().index($active);
  $('.navigation li:eq('+$id+')').addClass('active');
  $('div[wheel] > div:eq('+$id+')').addClass('active').css("opacity", 1.0).show();
}


// order if predefined category
function orderNavigation(){
  $str = $.deparam.fragment(window.location.href);
  $active = $(".navigation li[hashcontrol="+$str.category+"]");
  if($active==null) return;
  
  $id = $active.parent().children().index($active);
  $size = $(".navigation li").size();

  for($i=0;$i<$id;$i++){
    $element = $(".navigation li:eq("+$i+")");
    $(".navigation").append("<li hashcontrol='"+$element.attr('hashcontrol')
    +"' position='"+$element.attr('position')+"'>"+$element.text()+"</li>");
  }
  for($i=0;$i<$id;$i++){
    $(".navigation li:first-child").remove();
  }
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
    
    // change URL
    $str = $.param.fragment(window.location.href, 'category='+$(this).text().toLowerCase());
    window.location.href = $str;
    
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


function onImageError(){
  $("img").error(function () {
    if($(this).width() < 60) $src = "/images/placeholder/album.png";
    else $src = "/images/placeholder/artist.png"
    
    $(this).unbind("error").attr("src", $src);
  });
}