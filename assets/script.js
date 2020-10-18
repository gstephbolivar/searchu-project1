$(document).ready(function () {
  console.log("This works");
  // DOM VARIABLES
  var userCity = document.getElementById("city-search");

  var userSchool = $("#school-search");
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
    var school = userSchool.val();
    console.log("School Searched: " + school);

    // api key
    var apiKey = "BZXyW8EkmJtygGmoPPNTT8iIeiTbeshMqgalfuXm";

    // use latest. to get the most recent information

    var url =
      "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,school.city,latest.cost.avg_net_price.overall,latest.admissions.admission_rate.overall,latest.completion.consumer_rate,school.school_url&school.name=" +
      school +
      "&api_key=" +
      apiKey;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      //console.log("2");
      console.log(response);

      // loops through results to get the exact school being searched for
      for (var i = 0; i < response.results.length; i++) {
        console.log(response.results[i]["school.name"]);
        schoolName = response.results[i]["school.name"];
        schoolCity = response.results[i]["school.city"];
        annualCost = response.results[i]["latest.cost.avg_net_price.overall"];
        schoolURL = response.results[i]["school.school_url"];

        var newRow = $("<div>")
          .addClass("row")
          .attr("style", "background-color: white");

        var newSchool = $("<div>").addClass("col-md-6 m-4");

        newRow.append(newSchool);

        newSchool.append('<h3 id="school">' + schoolName + "</h3>");

        newSchool.append('<h5 id="city">' + "City: " + schoolCity + "</h5>");

        newSchool.append(
          '<h5 id="avg-cost">' + "Annual Tuition: " + annualCost + "</h5>"
        );

        newSchool.append(
          '<a href="' +
            urlFormat(schoolURL) +
            '" target="_blank">' +
            urlFormat(schoolURL) +
            "</a>"
        );

        // clearbit api to add university logos
        // newSchool.append(
        //   $("<img>").attr(
        //     "src",
        //     "https://logo.clearbit.com/" + urlFormat(schoolURL)
        //   )
        // );

        $("#school-list").append(newRow);
      }
    });
  }

  function populateCollegeInfo() {}
  function getCollegesByCity() {
    // variable to search API by city
    var city = userCity.value;
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
      //console.log("1");
      //console.log(response);
      // obtains a list of all school names
      for (var i = 0; i < response.results.length; i++) {
        schoolName = response.results[i]["school.name"];
        // schoolCity = response.results[i]["school.city"];
        annualCost = response.results[i]["latest.cost.avg_net_price.overall"];
        schoolURL = response.results[i]["school.school_url"];
        var newRow = $("<div>")
          .addClass("row")
          .attr("style", "background-color: white");

        var newSchool = $("<div>").addClass("col-md-6 m-4");

        newRow.append(newSchool);

        newSchool.append('<h3 id="school">' + schoolName + "</h3>");

        newSchool.append(
          '<h5 id="avg-cost">' + "Annual Tuition: " + annualCost + "</h5>"
        );

        newSchool.append(
          '<a href="' +
            urlFormat(schoolURL) +
            '" target="_blank">' +
            urlFormat(schoolURL) +
            "</a>"
        );

        $("#school-list").append(newRow);
        // createList(schoolName, annualCost, schoolURL);
        // admissionsRate =
        //   response.results[i]["latest.admissions.admission_rate.overall"];
        // completionRate = response.results[i]["latest.completion.consumer_rate"];
        // schoolURL = response.results[i]["school.school_url"];
        // console.log("Name: " + schoolName);
        // console.log("URL: " + schoolURL);
        // console.log("City: " + schoolCity);
        // console.log("Admission Rate: " + admissionsRate);
        // console.log("Annual Cost: " + annualCost);
        // console.log("Completion Rate: " + completionRate);
        // console.log("--------");
      }
      var widget = $("<a>");
      widget.addClass("teleport-widget-link");
      widget.attr("href", "https://teleport.org/cities/atlanta/");
      widget.text("Life quality score - Atlanta");
      console.log("widget", widget);
      $("#widget").append(widget);

      var widgetQuality = $("<script>");
      widgetQuality.addClass("async");
      widgetQuality.attr("type", "text/javascript");
      widgetQuality.addClass("teleport-widget-script");
      widgetQuality.attr(
        "data-url",
        "https://teleport.org/cities/atlanta/widget/scores/?currency=USD&citySwitcher=false"
      );
      widgetQuality.attr("data-max-width", "770");
      widgetQuality.attr("data-height", "232");
      widgetQuality.attr(
        "src",
        "https://teleport.org/assets/firefly/widget-snippet.min.js"
      );
      $("<body>").append(widgetQuality);

      // var widget = $("<a>")
      //   .addClass("teleport-widget-link")
      //   .attr("href=https://teleport.org/cities/atlanta/")
      //   .text("Life quality score - Atlanta");
      // console.log("widget",widget);
      // $("#widget").append(widget);
    });
  }
  function urlFormat(site) {
    if (site.substring(0, 4) === "http") {
      return site;
    } else {
      return "https://" + site;
    }
  }

  // Gets the city or cities if more than one with the same name
  function getQualityOfLife() {
    var city = "Atlanta";
    var queryURL = "https://api.teleport.org/api/cities/?search=" + city;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      //console.log(response);
      //console.log(queryURL);
      for (
        var i = 0;
        i < response._embedded["city:search-results"].length;
        i++
      ) {
        var cityName =
          response._embedded["city:search-results"][i].matching_full_name;
        //console.log("City: " + cityName);
      }
    });
  }

  // FUNCTION CALLS

  getCollegesByCity();
  console.log("colleges");

  getQualityOfLife();
  // qWidget();

  // EVENT LISTENERS
  $("#submit-city").on("click", function (event) {
    event.preventDefault();
    $("#home-page").addClass("d-none");
    $("#school-list").removeClass("d-none");
    getCollegesByCity();
  });

  $("#submit-school").on("click", function (event) {
    event.preventDefault();
    $("#home-page").addClass("d-none");
    $("#school-list").removeClass("d-none");
    getCollegeInfo();
  });
});
