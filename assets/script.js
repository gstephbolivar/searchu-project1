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

  // gets college information by name of the school
  // school name has autocomplete -- allows user to enter keywords to get a list of school with those words
  // may be able to use this to autocomplete search field and then search for specific school
  function getCollegeInfo() {
    var school = "University of Georgia";

    // api key
    var apiKey = "BZXyW8EkmJtygGmoPPNTT8iIeiTbeshMqgalfuXm";

    // use latest. to get the most recent information

    var url =
      "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,latest.cost.avg_net_price.overall,latest.admissions.admission_rate.overall,latest.completion.consumer_rate,school.school_url&school.name=" +
      school +
      "&api_key=" +
      apiKey;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      console.log("2");
      //console.log(response);

      // loops through results to get the exact school being searched for
      for (var i = 0; i < response.results.length; i++) {
        if (response.results[i]["school.name"] === school) {
          console.log(school);
        }
      }
    });
  }
  function getCollegesByCity() {
    // variable to search API by city
    var city = "atlanta";
    // api key
    var apiKey = "BZXyW8EkmJtygGmoPPNTT8iIeiTbeshMqgalfuXm";

    // use latest. to get the most recent information
    var url =
      "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,latest.cost.avg_net_price.overall,latest.admissions.admission_rate.overall,latest.completion.consumer_rate,school.school_url&school.city=" +
      city +
      "&api_key=" +
      apiKey;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      console.log("1");
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

  function createList(){
    for (var i = 0; i < 6; i++) {
      var newSchool = $("<div>")
        .addClass("row");

      newSchool.append(
        '<h3 id="school">'+ schoolName +'</h3>'
      );

      newSchool.append(
        '<h5 id="avg-cost">'+ annualCost +'</h5>'
      );

      newSchool.append(
        '<a href="https://www.gsu.edu/" target="_blank">'+schoolURL+'</a>'
      );

      $("#school-list").append(newSchool);
    }
  }

  // FUNCTION CALLS

  getCollegesByCity();
  console.log("colleges");
  getCollegeInfo();

  // EVENT LISTENERS
  
});
