function changeDocumentTitle(to, special)
{
  special = (typeof special == "undefined" || typeof special == "boolean") ? null : special;
  
  titleLink = (to.substring(to.length-1, to.length) == "/") ? 
    to.substring(0, to.length-1) : to;

  titleLink = titleLink.replaceAll("/","");
  
  switch(titleLink)
  {
    case "artists":
      titleLink = special;
      special = null;
      break;
    case "home":
      document.title = documentTitle;
      return;
      break;
  }
  
  document.title = titleLink.urifyAll();
  if (special) document.title += " » " + special.urifyAll();
  document.title += " on " + documentTitle;
}