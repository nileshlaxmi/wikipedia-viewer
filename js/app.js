$(document).ready(function() {
  $('#search-button').click(function() {
    let input = $('#search-tag').val();
    var urlString = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + input + "&format=json&callback=?";

    let wikiTopic, wikiDesc, wikiLinks, wikiLinksJSON;
    let len = 0;

    $.ajax({
      type: "GET",
      dataType: "json",
      async: "false",
      url: urlString,
      success: function(result) {
        wikiTopic = result[1];
        wikiDesc = result[2];
        wikiLinks = result[3];

        if (wikiTopic.length == 0) {
          $("ul").text("<li><h4>No data found</h4></li>");
        }
        else {
          $("ul").html("");
          for (let i = 0; i < wikiTopic.length; i++) {
            $("ul").append("<li><a href="+wikiLinks[i]+" target=_blank><h4>"+wikiTopic[i]+"</h4></a>"+"<p>"+wikiDesc[i]+"</p></li>");
          }
        }
      },

      error: function(err){
        alert("Exception found"+err);
      }

    });
  $('#search-tag').val("");
  });
});
