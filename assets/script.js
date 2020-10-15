$(document).ready(function () {
  console.log("This works");

  // DOM VARIABLES

  // JS VARIABLES

  var schoolName;
  var schoolCity;
  var annualCost;
  var admissionsRate;
  var completionRate;
  var schoolURL;

  // FUNCTION DEFINITIONS

  function getCollegeInfo() {
    var school = "New%20York";

    // api key
    var apiKey = "BZXyW8EkmJtygGmoPPNTT8iIeiTbeshMqgalfuXm";

    // use latest. to get the most recent information

    var url =
      "https://api.data.gov/ed/collegescorecard/v1/schools?_school.name=New%20York" +
      //   school +
      "&api_key=" +
      apiKey;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  }
  function getCollegesByCity() {
    // variable to search API by city
    var city = "atlanta";
    // api key
    var apiKey = "BZXyW8EkmJtygGmoPPNTT8iIeiTbeshMqgalfuXm";

    // use latest. to get the most recent information
    var url =
      "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,latest.cost.avg_net_price.overall,latest.admissions.admission_rate.overall,latest.completion.consumer_rate,school.school_url&_school.city=" +
      city +
      "&api_key=" +
      apiKey;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // obtains a list of all school names
      //   for (var i = 0; i < response.results.length; i++) {
      //     schoolName = response.results[i]["school.name"];
      //     schoolCity = response.results[i]["school.city"];
      //     annualCost = response.results[i]["latest.cost.avg_net_price.overall"];
      //     admissionsRate =
      //       response.results[i]["latest.admissions.admission_rate.overall"];
      //     completionRate = response.results[i]["latest.completion.consumer_rate"];
      //     schoolURL = response.results[i]["school.school_url"];
      //     console.log("Name: " + schoolName);
      //     console.log("URL: " + schoolURL);
      //     console.log("City: " + schoolCity);
      //     console.log("Admission Rate: " + admissionsRate);
      //     console.log("Annual Cost: " + annualCost);
      //     console.log("Completion Rate: " + completionRate);
      //     console.log("--------");
      //   }
    });
  }

  // FUNCTION CALLS

  //getCollegesByCity();
  getCollegeInfo();

  // EVENT LISTENERS
});
