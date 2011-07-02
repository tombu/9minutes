String.prototype.replaceAll = function( 
  strTarget,
  strSubString
  ){
    var strText = this;
    var intIndexOfMatch = strText.indexOf( strTarget );

    while (intIndexOfMatch != -1)
    {
      strText = strText.replace( strTarget, strSubString )
      intIndexOfMatch = strText.indexOf( strTarget );
    }

  return(strText);
}

String.prototype.urifyAll = function(){
  var strText = this;
  var text = unescape(decodeURI(strText).replaceAll("+", " "));

  return(text);
}