function changeDocumentTitle(to, special)
{
  special = (typeof special == "undefined" || typeof special == "boolean") ? null : special;
  
  titleLink = (to.substring(to.length-1, to.length) == "/") ? 
    to.substring(0, to.length-1) : to;

  titleLink = titleLink.replaceAll("/","");
  
  if(titleLink == "artists")
  {
    titleLink = special;
    special = null;
  }
  
  document.title = documentTitle + " » " + titleLink.urifyAll();
  if (special) document.title += " » " + special.urifyAll();
}