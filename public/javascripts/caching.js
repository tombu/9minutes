function cacheRequest(key, value)
{
  value = (typeof value == "undefined" || typeof value == "boolean") ? false : value;
  
  if(!value)
    return (jQuery.data(document.body, key) == null) ? false : jQuery.data(document.body, key);
  else
    return jQuery.data(document.body, key, value);
}