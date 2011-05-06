

$(document).ready(function(){
  fixLists(); // fix margins for displaying the lists correctly
  
  initNavigation(); // set positions and :active for navigation elements
  handleNavigation(); // handle animations and content switch
  orderNavigation(); // order if predefined category
  onImageError(); // replace broken image links with placeholders
  initPictureOverlay();
  
  fitImages(".artists img"); // resize and resposition images (artists, album)
  fitImages("#artist .side .img img");
});

$(window).load(function() {
  initSearchDropdown(); // dropdown for the search input
});


function initPictureOverlay(){
  $('#artist .gallery a').live("click", function(){
    $src = $(this).attr("picture");
    $original = $(this).attr("original");
    $('#overlayGallery .original').hide().attr('href', $original);
    $('#overlayGallery .content .galleryimage').hide().attr('src', $src)
      .bind("load", function() {    
        $(this).fadeIn(300, function(){
          $('#overlayGallery .original').fadeIn(300);
        });
    });   
  });
  $('#overlayGallery .close').click(function(){
    setTimeout(
      "$('#overlayGallery .content .galleryimage').attr('src', '/images/placeholder/gallery.png');"
    , 450);
  });
}


function ajj(){
/*
  $('#myajax').load('/artists', function() {
    $(this).prepend("<b color='green'>FERTIG</b>");
  });*/
}






function fitImages(selector) {
  switch(selector)
  {
    case ".artists img": divWidth = 126, divHeight = 81; break;
    case "#artist .side .img img": divWidth = 363, divHeight = 241; break;
  }
	$(selector).each(function() {
		$(this).wrap("<div />");
		
		// use this instead of $(this).width(); because .width() of hidden images is zero!
		width = this.width;
		height = this.height;
		if( width < divWidth ) {
			scaleRatio = width / divWidth;
			width = divWidth;
			height /= scaleRatio;
		}
    else {
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
    $(this).fadeOut(300);
  });
  
  $("div[dropping] .box li").live("click", function(){
    $("div[dropping] > span").html($(this).html());
    $("div[dropping] #category").attr("value", $(this).html().toLowerCase());
  });
}

// list fixes
function fixLists()
{
  $(".artists li:nth-child(7n)").css("marginRight", 0);
  $(".songs.tab li:nth-child(2n)").css("marginRight", 0);
  $("#artist .gallery a:nth-child(6n)").css("marginRight", 0);
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
  $i = 0;
  $('.navigation').each(function(){
    if($(this).hasClass("hash"))
    {
      $str = $.deparam.fragment(window.location.href);
      $active = $(".navigation li[hashcontrol="+$str.category+"]");
      if($active.text() == "" || $active == null) $id = 0;
      else $id = $active.parent().children().index($active);
    }
    else $id = 0;
    
    $(this).children('li:eq('+$id+')').addClass('active');
    $('div[wheel]:eq('+$i+') > div:eq('+$id+')').addClass('active').css("opacity", 1.0).show();
    $i++;
  });
}


// order if predefined category
function orderNavigation(){
  $(".navigation.hash").each(function(){
    $str = $.deparam.fragment(window.location.href);
    $active = $(this).children("[hashcontrol="+$str.category+"]");
    if($active.text() == "" || $active == null) return;
    
    $id = $active.parent().children().index($active);
    $size = $(this).children().size();
  
    for($i=0;$i<$id;$i++){
      $element = $(this).children(":eq("+$i+")");
      $(this).append("<li hashcontrol='"+$element.attr('hashcontrol')
      +"' position='"+$element.attr('position')+"'>"+$element.text()+"</li>");
    }
    for($i=0;$i<$id;$i++){
      $(this).children().first().remove();
    }
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
    if(!$settings['nav'].hasClass('sub')){
      $str = $.param.fragment(window.location.href, 'category='+$(this).attr("hashcontrol"));
      window.location.href = $str;
    }
    
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
      
      $settings['nav'].append("<li style='opacity:0;margin-left: 20px;' hashcontrol='"+$element.attr('hashcontrol')+"' position='"+$element.attr('position')+"'>"+$element.text()+"</li>");
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




// Overlay
function overlay(id)
{
    $.blockUI({ 
      message:   $(id), 
      timeout:   0,
	    fadeIn:    200, 
	    fadeOut:   300
    });     
    $(id+" .close").click(function() {
        $.unblockUI(); 
        return false; 
    });
}



function onImageError(){
  $("img").error(function () {
    if($(this).width() < 60) $src = "/images/placeholder/album.png";
    else $src = "/images/placeholder/artist.png"
    
    $(this).unbind("error").attr("src", $src);
  });
}