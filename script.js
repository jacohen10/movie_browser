$(document).ready(function(){
  var clickCount = 0;
  $(":submit").on("click", function(){
    $('#movie-select').show();
    var title = $(".title").val();
    var url = "http://www.omdbapi.com/?s=" + title + "&r=json";
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json"
    }).done(function(response){
      $('#movie-select').empty();
      newOption = document.createElement('option');
      newOption.innerHTML = "Movies matching &quot;" + title +"&quot; ...";
      $("body select").append(newOption);
      for (var i = 0; i < response.Search.length; i++){
        var titleResults = response.Search[i].Title;
        newOption = document.createElement('option');
        newOption.innerHTML = (titleResults);
        newOption.value = (titleResults);
        $("body select").append(newOption);
      }
    }).fail(function(){
      console.log("Fail");
    }).always(function(){
      console.log("Always happening");
    });
  });

  $('#movie-select').on("change", function(response){
    var selectedTitle = encodeURI(this.value);
    console.log(selectedTitle);
    var url = "http://www.omdbapi.com/?t=" + selectedTitle + "&r=json";
    console.log(url);
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json"
    }).done(function(response){
      $('.selectedTitle').empty();
      $('.poster').empty();
      newDiv = document.createElement('div');
      newDiv.innerHTML = "<h1>" + response.Title + "</h1>";
      $(".selectedTitle").append(newDiv);
      newIMG = document.createElement("IMG");
      newIMG.src = response.Poster;
      $(".poster").append(newIMG);
    });
  });

});
