$(document).ready(function () {
  console.log("This works");
  // DOM VARIABLES
  var userCity = document.getElementById("city-search");

  var userSchool = $("#school-search");
  // JS VARIABLES

  var schoolName;
  var schoolCity;
  var schoolState;
  var annualCost;
  var admissionsRate;
  var completionRate;
  var schoolURL;

  // boolean for determining information loaded when calling getCollegeInfo()
  var finalSchool;

  // FUNCTION DEFINITIONS

  // gets college information by name of the school
  // school name has autocomplete -- allows user to enter keywords to get a list of school with those words
  // may be able to use this to autocomplete search field and then search for specific school

  // I want to use this function to just be the API call and maybe pass in parameters that will determine what function is called within this to a) populate the list of universities or b) populate the information for the selected school
  function getCollegeInfo(searchSchool) {
    // gets the school searched to pass to the API

    console.log("School Searched: " + searchSchool);

    // api key
    var apiKey = "BZXyW8EkmJtygGmoPPNTT8iIeiTbeshMqgalfuXm";

    // use latest. to get the most recent information

    // gets school.name
    // school.city
    // school.state
    // avg_net_price.overall tuition cost
    // overall admissions rate (admissions.admission_rate.overall)
    // completion rate (completion.consumer_rate)
    // school url (school.school_url)
    // average SAT score (latest.admissions.sat_scores.average.overall)
    // median debt (latest.aid.median.debt.completers.overall)
    // in state tuition (latest.cost.tuition.in_state)
    // out of state tuition (latest.cost.tuition.out_of_state)
    // earnings after graduation (latest.earnings.6_yrs_after_entry.median)
    // median household income (latest.student.demographics.median_hh_income)
    // undergraduate student size  (latest.student.size)

    var url =
      "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,school.city,school.state,latest.cost.avg_net_price.overall,latest.admissions.admission_rate.overall,latest.completion.consumer_rate,school.school_url,latest.student.demographics.median_hh_income,latest.aid.median_debt.completers.overall,latest.earnings.6_yrs_after_entry.median,latest.admissions.sat_scores.average.overall,latest.student.size,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state&school.name=" +
      searchSchool +
      "&api_key=" +
      apiKey;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      //console.log("2");
      //console.log("city" + JSON.stringify(response, null, 2));

      //populateCollegeList(schoolName, schoolCity, schoolState, schoolURL);

      // calls populate college list function passing the object from the API call
      if (finalSchool === false) {
        populateCollegeList(response);
      } else {
        schoolPage(response);
      }
    });
  }

  // creates the buttons for each college from the API call object
  function populateCollegeList(response) {
    for (var i = 0; i < response.results.length; i++) {
      //console.log(response.results[i]["school.name"]);
      schoolName = response.results[i]["school.name"];
      schoolCity = response.results[i]["school.city"];
      schoolState = response.results[i]["school.state"];
      annualCost = response.results[i]["latest.cost.avg_net_price.overall"];
      schoolURL = response.results[i]["school.school_url"];
      // creates a new button with the name of the school, the city and state, and the url
      var newRowBtn = $("<button>").addClass(
        "list-group-item list-group-item-action col-md-12"
      );
      newRowBtn.attr("school-name", schoolName);

      // sets the logo for the university on the button
      var collegeLogo = $("<img>").attr(
        "src",
        "https://logo.clearbit.com/" + urlFormat(schoolURL)
      );

      // sets default image in case clearbit is not able to pull university logo
      collegeLogo.attr(
        "onerror",
        "this.onerror=null;this.src='./assets/photos/generic-uni-logo.png'"
      );

      // sets the styling the logo
      collegeLogo.addClass("float-left pr-3");
      newRowBtn.append(collegeLogo);

      newRowBtn.append('<h3 id="school">' + schoolName + "</h3>");

      newRowBtn.append(
        '<h5 id="city">' + "City: " + schoolCity + ", " + schoolState + "</h5>"
      );

      newRowBtn.append(
        "Website: " +
          '<a href="' +
          urlFormat(schoolURL) +
          '" target="_blank">' +
          urlFormat(schoolURL) +
          "</a>"
      );

      $("#uni-buttons").append(newRowBtn);
    }
  }

  function displayCollegeDetails(response) {
    console.log(response);
  }

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
      console.log("city" + JSON.stringify(response, null, 2));
      // obtains a list of all school names
      for (var i = 0; i < response.results.length; i++) {
        schoolName = response.results[i]["school.name"];
        // schoolCity = response.results[i]["school.city"];
        annualCost = response.results[i]["latest.cost.avg_net_price.overall"];
        schoolURL = response.results[i]["school.school_url"];
        completionRate = response.results[i]["latest.completion.consumer_rate"];
        var newRow = $("<button>").addClass(
          "list-group-item list-group-item-action col-md-12"
        );
        newRow.attr("school-name", schoolName);
        // sets the logo for the university on the button
        var collegeLogo = $("<img>").attr(
          "src",
          "https://logo.clearbit.com/" + urlFormat(schoolURL)
        );

        // sets default image in case clearbit is not able to pull university logo
        collegeLogo.attr(
          "onerror",
          "this.onerror=null;this.src='./assets/photos/generic-uni-logo.png'"
        );

        // sets the styling the logo
        collegeLogo.addClass("float-left pr-3");
        newRow.append(collegeLogo);

        newRow.append('<h3 id="school">' + schoolName + "</h3>");
        newRow.append(
          '<h5 id="avg-cost">' +
            "Annual Tuition: " +
            formatTuition(annualCost) +
            "</h5>"
        );
        newRow.append(
          '<h5 id="comp-rate">' +
            "Completion Rate: " +
            formatCompRate(completionRate) +
            "</h5>"
        );
        newRow.append(
          '<a href="' +
            urlFormat(schoolURL) +
            '" target="_blank">' +
            urlFormat(schoolURL) +
            "</a>"
        );

        $("#chosenbutton").append(newRow);
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
    });
  }

  // function takes in the object from the API call in order to populate school details
  function schoolPage(response) {
    console.log("this is a test of schoolPage");
    console.log(response);
    schoolName = response.results[0]["school.name"];
    // $("#school-info")
    //   .append("<h1>" + schoolName + "</h1>")
    //   .attr("style", "background-color: white")
    //   .addClass("text-center");
  }

  function urlFormat(site) {
    if (site.substring(0, 4) === "http") {
      return site;
    } else {
      return "https://" + site;
    }
  }

  function formatTuition(num) {
    if (num === null) {
      return "N/A";
    } else {
      return "$" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }

  function formatCompRate(rate) {
    if (rate === null) {
      return "N/A";
    } else {
      return Math.ceil(rate * 100) + "%";
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

  // listens for the university search button to populate the university names
  $("#submit-school").on("click", function (event) {
    event.preventDefault();
    $("#home-page").addClass("d-none");
    $("#uni-list").removeClass("d-none");
    finalSchool = false;
    var school = userSchool.val();
    getCollegeInfo(school);
  });

  // need to create event listener to check for when a university button is pressed --> this will call function to display university information

  $("#chosenbutton").on("click", "button", function (event) {
    event.preventDefault();
    $("#school-list").addClass("d-none");
    schoolPage($(this).attr("school-name"));
    $("#final-page").removeClass("d-none");
  });

  // event listener to create school page
  $("#uni-buttons").on("click", "button", function (event) {
    event.preventDefault();
    $("#uni-list").addClass("d-none");
    finalSchool = true;
    getCollegeInfo($(this).attr("school-name"));
    $("#final-page").removeClass("d-none");
  });
  // could possible use the same functions if parameters are passed in properly to fork which function are called after the API information is received
});
