var app_id = "4A94D5EF40829653D0DEF38BC51FE7BC8115FE5F";

function bing_search(search_term)
{
  var requestStr = "http://api.bing.net/json.aspx?"
      // Common request fields (required)
      + "AppId=" + app_id
      + "&Query=" + search_term
      + "&Sources=Web"
      
      // Common request fields (optional)
      + "&Version=2.0"
      + "&Market=en-us"
      + "&Adult=Moderate"
      + "&Options=EnableHighlighting"

      // Web-specific request fields (optional)
      + "&Web.Count=5"
      + "&Web.Offset=0"
      + "&Web.Options=DisableHostCollapsing+DisableQueryAlterations"

      // JSON-specific request fields (optional)
      + "&JsonType=callback"
      + "&JsonCallback=SearchCompleted";
  
  var head = document.getElementsByTagName('head');
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = requestStr;
  head[0].appendChild(script);
  
  $('#artist_links .bing').wrap('<a href="http://www.bing.com/search?q='+search_term+'" />');
}

function SearchCompleted(response)
{
    var errors = response.SearchResponse.Errors;
    if (errors != null) DisplayErrors(errors);
    else DisplayResults(response);
}

function DisplayResults(response)
{
    var results = response.SearchResponse.Web.Results;
    var resultsListItem = null;
    var resultStr = "";
    for (var i = 0; i < results.length; ++i)
    {
        title = (results[i].Title.length > 40) ? results[i].Title.substring(0,40) + "&hellip;" : results[i].Title;
        $appendData = "<li><a href=\""+results[i].Url+"\"><h3>"+title+"</h3>"+results[i].DisplayUrl+"</a></li>";
        $appendData = ReplaceHighlightingCharacters($appendData, "<span>", "</span>");
        $('#artist_links ul').append($appendData);
    }
}
function ReplaceHighlightingCharacters(text, beginStr, endStr)
{
    var regexBegin = new RegExp("\uE000", "g");
    var regexEnd = new RegExp("\uE001", "g");
          
    return text.replace(regexBegin, beginStr).replace(regexEnd, endStr);
}

function DisplayErrors(errors)
{
    $('#artist_links').prepend("<b>Error.</b><br/>Try again!");
}