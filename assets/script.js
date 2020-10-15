$(document).ready(function () {
  console.log("This works");

  function searchQuality(cityname) {
    var queryURL =
      "https://api.teleport.org/api/cities/?search=" + cityname;
    // var citySearch

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(queryURL);
    });
  }

  searchQuality();
});
