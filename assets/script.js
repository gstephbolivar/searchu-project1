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

  // FUNCTION DEFINITIONS

  // gets college information by name of the school
  // school name has autocomplete -- allows user to enter keywords to get a list of school with those words
  // may be able to use this to autocomplete search field and then search for specific school

  // I want to use this function to just be the API call and maybe pass in parameters that will determine what function is called within this to a) populate the list of universities or b) populate the information for the selected school
  function getCollegeInfo() {
    // gets the school searched to pass to the API
    var school = userSchool.val();
    console.log("School Searched: " + school);

    // api key
    var apiKey = "BZXyW8EkmJtygGmoPPNTT8iIeiTbeshMqgalfuXm";

    // use latest. to get the most recent information

    var url =
      "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,school.city,school.state,latest.cost.avg_net_price.overall,latest.admissions.admission_rate.overall,latest.completion.consumer_rate,school.school_url&school.name=" +
      school +
      "&api_key=" +
      apiKey;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      //console.log("2");
      console.log("city"+JSON.stringify(response, null, 2));


      //populateCollegeList(schoolName, schoolCity, schoolState, schoolURL);

      // calls populate college list function passing the object from the API call
      populateCollegeList(response);
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
    // event listener to create school page
    $("#uni-buttons").on("click", "button", function(event){
      event.preventDefault();
      $("#uni-list").addClass("d-none");
      schoolPage($(this).attr("school-name"));
    

    })
  }

  function schoolPage(school) {
    console.log(school);
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
      console.log("city"+JSON.stringify(response, null, 2));
      // obtains a list of all school names
      for (var i = 0; i < response.results.length; i++) {
        schoolName = response.results[i]["school.name"];
        // schoolCity = response.results[i]["school.city"];
        annualCost = response.results[i]["latest.cost.avg_net_price.overall"];
        schoolURL = response.results[i]["school.school_url"];
        completionRate = response.results[i]["latest.completion.consumer_rate"];
        var newRow = $("<button>")
          .addClass("list-group-item list-group-item-action col-md-12")

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

        newRow.append('<h3 id="school">' + schoolName + '</h3>');
        newRow.append(
          '<h5 id="avg-cost">' + "Annual Tuition: " + formatTuition(annualCost) + "</h5>"
        );
        newRow.append('<h5 id="comp-rate">'+"Completion Rate: "+formatCompRate(completionRate)+'</h5>');
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

  function formatTuition(num) {
    if (num === null){
      return "N/A"
    } else {
      return "$"+num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    
  } 

  function formatCompRate(rate) {
    if (rate === null){
      return "N/A"
    } else {
      return Math.ceil(rate * 100)+"%";
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

  // listens for the university search button to populate the university names
  $("#submit-school").on("click", function (event) {
    event.preventDefault();
    $("#home-page").addClass("d-none");
    $("#uni-list").removeClass("d-none");
    getCollegeInfo();
  });

  // need to create event listener to check for when a university button is pressed --> this will call function to display university information
  // could possible use the same functions if parameters are passed in properly to fork which function are called after the API information is received
});
