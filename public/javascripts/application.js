

$(document).ready(function(){
  fixLists(); // fix margins for displaying the lists correctly
  
  initNavigation(); // set positions and :active for navigation elements
  handleNavigation(); // handle animations and content switch
  orderNavigation(); // order if predefined category
  onImageError(); // replace broken image links with placeholders
  initPictureOverlay();
  
  initArtistDescription();
  
  initTopMusic();
  navigateTopMusic();
  
  initPlayer();
});

$(window).load(function() {
  initSearchDropdown(); // dropdown for the search input
    
  fitImages(".artists.big img"); // resize and resposition images (artists, album)
  fitImages(".artists.small img"); 
  fitImages(".artists.ultrasmall img");
  fitImages("#artist .side .img img");
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
  }).hover(function(){
    $(this).append('<img src="/images/ico/gallery-fullscreen.png" class="fscreen" />');
    $posy = $(this).children("img").height() / 2 - $(this).children('.fscreen').height() / 2 + 8;
    $(this).children('.fscreen').css('top', $posy).fadeTo(400, 0.8);
  }, function(){
    $(this).children('.fscreen').remove();
  });
  $('#overlayGallery .close').click(function(){
    setTimeout(
      "$('#overlayGallery .content .galleryimage').attr('src', '/images/placeholder/gallery.png');"
    , 450);
  });
}


function initPlayer(){
  $('#player #progress').rangeinput({
    progress: true,
    value: 10,
    speed: 200
  });
  $('#player #volume').rangeinput({
    progress: true,
    value: 50,
    speed: 200
  });
  
  $('#player .play').live('click', function(){
    $(this).toggleClass('pause');
  });
  
  $('#icons .volume').live('click', function(){
    $('#player #volume').fadeToggle(300);
  });
}


function initTopMusic(){
  $('#home .songs li').each(function(){
    if($(this).parent().children().index(this)>=5) $(this).hide();
  });
  $('#home .artists li').each(function(){
    if($(this).parent().children().index(this)>=2) $(this).hide();
  });
}

function navigateTopMusic(){
  $('#home .navigate a').live('click', function(){
    $selector = $(this).closest("h2").next("ul");
    $id = $selector.children("li:visible").first();
    $start = $id.parent().children().index($id);
    $count = parseInt($selector.attr("count"));
    $size = $selector.children().size();
    
    if($(this).hasClass("left")) {
      $start -= $count;
      if($start < 0) return;
    }
    else {
      $start += $count;
      if($start >= $size) return;
    }
    
    $selector.children().hide();
    for($i=$start;$i<$start+$count;$i++)
      $selector.children("li:eq("+$i+")").show();
  });
}

function ajj(){
/*
  $('#myajax').load('/artists', function() {
    $(this).prepend("<b color='green'>FERTIG</b>");
  });*/
}



function initArtistDescription(){
  $("#artist .description .text a").each(function(){
    $text = $(this).html();
    $(this).after($text).remove();
  });
}




function fitImages(selector) {
  switch(selector)
  {
    case ".artists.big img": divWidth = 252, divHeight = 166; $x=true; break;
    case ".artists.small img": divWidth = 230, divHeight = 152; $x=true; break;
    case ".artists.ultrasmall img": divWidth = 170, divHeight = 112; $x=true; break;
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
    

      $(this).parent().parent().append('<div class="borderwrap"></div>');
      $(this).parent().parent().find(".borderwrap").css({
        "position" : "absolute",
        "width" : divWidth,
        "height" : divHeight,
        "top" : 0,
        "left" : 0
      });
	});
}


// search dropdown
function initSearchDropdown()
{
  // hover and out
  $("div[dropping]").hoverIntent(function(){
    $(this).children(".box").fadeIn(500);
  }, function(){
    $(this).children(".box").fadeOut(300);
  });
  
  // fade out if selected
  $("div[dropping] .box").live("click", function(){
    $(this).fadeOut(300);
  });

  $("div[dropping] .box li").live("click", function(){
    $("div[dropping] > span").html($(this).html());
    $("div[dropping] #tab").attr("value", $(this).html().toLowerCase());
  });
}

// list fixes
function fixLists()
{
  $(".artists.small li:nth-child(4n)").css("marginRight", 0);
  $(".artists.ultrasmall li:nth-child(3n)").css("marginRight", 0);
  $(".songs.tab li:nth-child(2n)").css("marginRight", 0);
  $("#artist .gallery a:nth-child(6n)").css("marginRight", 0);
  $("#home .artists li:nth-child(2n)").css("marginRight", 0);
}

// set positions for navigation elements
function initNavigation()
{
  // set hash if submitted by search form
  $searchTab = $("#predefinedTab").text();
  if($searchTab != "")
  {
    $("#search_form #tab").attr("value", $searchTab);
    $("#search_form .selection > span").text($searchTab);
  }
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
      $searchTab = $("#predefinedTab").text();
      if($(this).hasClass("main") && $searchTab != "")
      {
        $str = $searchTab;
        $("#search_form .selection > span").text($searchTab);
      }
      else 
      {
        $str = $.deparam.fragment(window.location.href);
        $str = $str.tab;
      }
      $active = $(".navigation li[hashcontrol="+$str+"]");
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
    $active = $(this).children("[hashcontrol="+$str.tab+"]");
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
    if($(this).is('.active') || $(this).is(':animated')) return;
    
    // VARS
    $settings           = [];
    $fadeOutWidth       = 0;
    $settings['nav']    = $(this).parent();
    $settings['newpos'] = $settings['nav'].children().index(this);
    $settings['oldpos'] = $(this).attr("position");
    $settings['wheel']  = $settings['nav'].attr("steering");
    $settings['hash']   = $(this).attr("hashcontrol");
    $settings['speed']  = 300;
    $settings['range']  = 50;
    
    // for search bar
    if($(this).parent().hasClass("main"))
    {
      $("#search_form .selection > span").text($settings['hash']);
      $("#search_form #tab").attr("value", $settings['hash']);
    }
    
    // get the width of the navigation elements which will fade out
    for(var i=0; i<$settings['newpos'];i++){ 
      $fadeOutWidth += $settings['nav'].children("li:eq("+i+")").width(); 
    }
    
    // change :active
    $settings['nav'].children().removeClass("active");
    $(this).addClass("active");
    
    // change URL
    if(!$settings['nav'].hasClass('sub')){
      $str = $.param.fragment(window.location.href, 'tab='+$(this).attr("hashcontrol"));
      window.location.href = $str;
    }
    
    // move navigation container
    $settings['nav'].animate({
      marginLeft: -$fadeOutWidth-5
    }, $settings["speed"]*1.25);

    // move navigation elements
    for(var i=0; i<$settings['newpos'];i++){
      $element = $settings['nav'].children("li:eq("+i+")");
      $element.animate({
        opacity: 0
      }, $settings["speed"]*1.25, function(){
        $(this).remove();
        $settings['nav'].css("marginLeft", 0);
      });
      
      $settings['nav'].append("<li style='opacity:0;margin-left: 20px;' hashcontrol='"+$element.attr('hashcontrol')+"' position='"+$element.attr('position')+"'>"+$element.text()+"</li>");
      $settings['nav'].children().last().animate({
        opacity: 1, marginLeft: 0
      }, $settings["speed"]*2);
    }
    
    // animation for content
    $("div[wheel="+$settings['wheel']+"] > .active").css("left", 0).animate({
      left: -$settings["range"], opacity: 0
    }, $settings["speed"], function(){
      $(this).hide();
      $("div[wheel="+$settings['wheel']+"] > div:eq("+$settings['oldpos']+")")
        .css("left", $settings["range"])
        .show().addClass("active")
        .animate({
          left: 0, opacity: 1
        }, $settings["speed"]);
      })
      .removeClass("active");
      $("div[wheel="+$settings['wheel']+"] > div:eq("+$settings['oldpos']+") ul").each(function(){
        $x = 0;
        $size = $(this).children("li").size() / 10;
        $(this).children("li").hide().each(function(){
          showBox(this, $x, $settings["speed"]);
          $x+= 70 / $size;
        });
      });
  });
}
function showBox(onebox, y, speed)
{
  setTimeout(function(){
    $(onebox).fadeIn(speed+200);
  }, y);
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