$(document).ready(function () {
  console.log("This works");

  // DOM VARIABLES

  // JS VARIABLES

  // FUNCTION DEFINITIONS
  function getCollegeInfo() {
    var city = "athens";
    var apiKey = "BZXyW8EkmJtygGmoPPNTT8iIeiTbeshMqgalfuXm";
    var url =
      "https://api.data.gov/ed/collegescorecard/v1/schools?&_school.city=" +
      city +
      "&api_key=" +
      apiKey;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  }

  // FUNCTION CALLS

  getCollegeInfo();

  // EVENT LISTENERS
});
