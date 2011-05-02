$(window).load(function() {
  $(".artists li:nth-child(6n)").css("marginRight", 0);
  $(".songs.tab li:nth-child(2n)").css("marginRight", 0);
  
  
  $("ul[steering] li").live("click", function(){
    $(this).parent().children().each(function(){
      $(this).removeClass("active");
    });
    $(this).addClass("active");
    var wheel = $(this).parent().attr("steering");
    
    // get ID		
	  var id = $(this).parent().children().index(this);
    $active = $("div[wheel="+wheel+"] > .active");
    var active_id = $active.parent().children().index($active);
    
    $speed = 200;
    $range = 200;
    
    // animation
    if(id > active_id)
    {
      $("div[wheel="+wheel+"] > .active").css("left", 0).animate({
        left: -$range,
        opacity: 0
      }, $speed, function(){
        $(this).hide();
        $("div[wheel="+wheel+"] > div:eq("+id+")").css("left", $range).show().addClass("active").animate({
          left: 0,
          opacity: 1
        }, $speed);
      }).removeClass("active");
    }
    else if(id < active_id)
    {
      $("div[wheel="+wheel+"] > .active").css("left", 0).animate({
        left: $range,
        opacity: 0
      }, $speed, function(){
        $(this).hide();
        $("div[wheel="+wheel+"] > div:eq("+id+")").css("left", -$range).show().addClass("active").animate({
          left: 0,
          opacity: 1
        }, $speed);
      }).removeClass("active");
    }
  });
});