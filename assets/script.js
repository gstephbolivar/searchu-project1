$(document).ready(function () {
  console.log("Should be working");
  // DOM VARIABLES
  var userCity = document.getElementById("city-search");

  var userSchool = $("#school-search");

  var schoolInfoHeader = $(".card-header");

  var schoolInfoDetails = $("#school-details");
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

  var cityArray = [];

  // FUNCTION DEFINITIONS

  // gets college information by name of the school
  // school name has autocomplete -- allows user to enter keywords to get a list of school with those words

  function getCollegeInfo(searchSchool) {
    // gets the school searched to pass to the API

    // api key
    var apiKey = "BZXyW8EkmJtygGmoPPNTT8iIeiTbeshMqgalfuXm";

    var url =
      "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,school.city,school.state,latest.cost.avg_net_price.overall,latest.admissions.admission_rate.overall,latest.completion.consumer_rate,school.school_url,latest.student.demographics.median_hh_income,latest.aid.median_debt.completers.overall,latest.earnings.6_yrs_after_entry.median,latest.admissions.sat_scores.average.overall,latest.student.size,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state&school.name=" +
      searchSchool +
      "&api_key=" +
      apiKey;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
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
      schoolName = response.results[i]["school.name"];
      schoolCity = response.results[i]["school.city"];
      schoolState = response.results[i]["school.state"];
      annualCost = response.results[i]["latest.cost.avg_net_price.overall"];
      schoolURL = response.results[i]["school.school_url"];
      completionRate = response.results[i]["latest.completion.consumer_rate"];

      var newRow = $("<button>").addClass(
        "list-group-item list-group-item-action col-md-12"
      );
      newRow.attr("school-name", schoolName);
      newRow.attr("school-city", schoolCity);

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
      collegeLogo.addClass("float-left pr-3 logo");
      newRow.append(collegeLogo);

      newRow.append('<h3 id="school">' + schoolName + "</h3>");

      newRow.append(
        '<h4 id="city" class="text-muted">' +
          schoolCity +
          ", " +
          schoolState +
          "</h4>"
      );

      newRow.append(
        '<h6 id="avg-cost">' +
          "Annual Tuition: " +
          formatTuition(annualCost) +
          "</h6>"
      );
      newRow.append(
        '<h6 id="comp-rate">' +
          "Completion Rate: " +
          formatCompRate(completionRate) +
          "</h6>"
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
    //getCity(schoolCity);
  }
  function getCollegesByCity(city) {
    // api key
    var apiKey = "BZXyW8EkmJtygGmoPPNTT8iIeiTbeshMqgalfuXm";

    // use latest. to get the most recent information
    var url =
      "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,school.city,school.state,latest.cost.avg_net_price.overall,latest.admissions.admission_rate.overall,latest.completion.consumer_rate,school.school_url,latest.student.demographics.median_hh_income,latest.aid.median_debt.completers.overall,latest.earnings.6_yrs_after_entry.median,latest.admissions.sat_scores.average.overall,latest.student.size,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state&school.city=" +
      city +
      "&api_key=" +
      apiKey;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      //console.log("1");
      //console.log("city" + JSON.stringify(response, null, 2));
      // obtains a list of all school names
      populateCollegeList(response);
    });

    //getCity(city);
    // console.log("HELLO", city);
  }

  // function takes in the object from the API call in order to populate school details
  function schoolPage(response) {
    // school name
    schoolName = response.results[0]["school.name"];
    // school url
    schoolURL = response.results[0]["school.school_url"];

    // school logo
    collegeLogo = $("<img>").attr(
      "src",
      "https://logo.clearbit.com/" + urlFormat(schoolURL)
    );

    // school city
    schoolCity = response.results[0]["school.city"];
    // school state
    schoolState = response.results[0]["school.state"];

    // admission rate
    admissionsRate =
      response.results[0]["latest.admissions.admission_rate.overall"];

    // completion rate
    completionRate = response.results[0]["latest.completion.consumer_rate"];

    // SAT score
    var avgSATScore =
      response.results[0]["latest.admissions.sat_scores.average.overall"];

    // average overall costs
    annualCost = response.results[0]["latest.cost.avg_net_price.overall"];
    // in-state tuition
    var inStateTuition = response.results[0]["latest.cost.tuition.in_state"];
    // out-of-state tuition
    var outStateTuition =
      response.results[0]["latest.cost.tuition.out_of_state"];
    // median debt
    var debt = response.results[0]["latest.aid.median_debt.completers.overall"];

    // median earnings
    var earnings =
      response.results[0]["latest.earnings.6_yrs_after_entry.median"];

    // undergraduate student size
    var studentSize = response.results[0]["latest.student.size"];

    // school logo and name in card header
    collegeLogo.attr(
      "onerror",
      "this.onerror=null;this.src='./assets/photos/generic-uni-logo.png'"
    );

    collegeLogo.addClass("float-left pr-3 logo");
    schoolInfoHeader.append(collegeLogo);

    schoolInfoHeader.append("<h1 class='text-center'>" + schoolName + "</h1>");

    // adding all school detail information to the detail container

    schoolInfoDetails.append(
      "<h4 class='text-center'>" + schoolCity + ", " + schoolState + "</h4>"
    );

    schoolInfoDetails.append(
      "Website: " +
        "<a href='" +
        urlFormat(schoolURL) +
        "'>" +
        urlFormat(schoolURL) +
        "</a>"
    );

    // admissions information
    schoolInfoDetails.append(
      "<h5 class='pt-3 text-info'>Admissions and Completion Information</h5>"
    );

    // undergraduate student size - calls function to populate list items
    createDetailsListItem(
      schoolInfoDetails,
      "<b>Undergraduate Students: </b>",
      studentSize
    );

    // admission rate - calls function to populate list items
    createDetailsListItem(
      schoolInfoDetails,
      "<b>Admissions Rate: </b>",
      formatCompRate(admissionsRate)
    );

    // average SAT scores for admission - calls function to populate list items
    createDetailsListItem(
      schoolInfoDetails,
      "<b>Average SAT Score Admitted: </b>",
      avgSATScore
    );

    // completion rate - calls function to populate list items
    createDetailsListItem(
      schoolInfoDetails,
      "<b>Completion Rate: </b>",
      formatCompRate(completionRate)
    );

    // Cost Information Details
    schoolInfoDetails.append(
      "<h5 class='pt-3 text-info'>Cost Details Information</h5>"
    );

    // average tuition costs - calls function to populate list items
    createDetailsListItem(
      schoolInfoDetails,
      "<b>Average Annual Cost: </b>",
      formatTuition(annualCost)
    );

    // In-state Tuition costs - calls function to populate list items
    createDetailsListItem(
      schoolInfoDetails,
      "<b>In-State Tuition: </b>",
      formatTuition(inStateTuition)
    );

    // out-of-state tuition costs - calls function to populate list items
    createDetailsListItem(
      schoolInfoDetails,
      "<b>Out-of-State Tuition: </b>",
      formatTuition(outStateTuition)
    );

    // earnings details
    schoolInfoDetails.append(
      "<h5 class='pt-3 text-info'>Average Earnings Details</h5>"
    );

    // median earnings after graduation - calls function to populate list items
    createDetailsListItem(
      schoolInfoDetails,
      "<b>Median Earnings after Graduation: </b>",
      formatTuition(earnings)
    );
    // median debt after graduation - calls function to populate list items
    createDetailsListItem(
      schoolInfoDetails,
      "<b>Median Debt after Graduation: </b>",
      formatTuition(debt)
    );
  }

  // creates the list item details for the selected school
  function createDetailsListItem(container, html, apiData) {
    var listGroup = $("<ul>").addClass("list-group");
    var listItem = $("<li>").addClass("list-group-item");

    container.append(listGroup.append(listItem.html(html + apiData)));
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
    var city = "";
    var queryURL = "https://api.teleport.org/api/cities/?search=" + city;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      for (
        var i = 0;
        i < response._embedded["city:search-results"].length;
        i++
      ) {
        var cityName =
          response._embedded["city:search-results"][i].matching_full_name;
      }
    });
  }
  function getCity(city) {
    city = city.toLowerCase();
    $.ajax({
      url:
        "https://cors-anywhere.herokuapp.com/https://developers.teleport.org/assets/urban_areas.json",
      method: "GET",
      //crossDomain: true,
    }).then(function (response) {
      //console.log(response);
      var cityObj = Object.values(response);
      //console.log(cityObj.length);
      for (var i = 0; i < cityObj.length; i++) {
        //console.log(cityObj[i]);
        cityArray.push(cityObj[i]);
      }
      console.log("CITIES HERE", cityArray);
    });
    console.log("IT HERE", cityArray);
    if (cityArray.includes(city)) {
      $("#final-widget").addClass("d-none");
      $("#hide-alert").removeClass("d-none");
    }

    var teleport = `
    <a
    class="teleport-widget-link"
    href="https://teleport.org/cities/${city}/"
    ></a
  >
  <script
    async
    class="teleport-widget-script"
    id="widget-search"
    data-url="https://teleport.org/cities/${city}/widget/scores/?currency=USD&citySwitcher=false"
    data-max-width="770"
    data-height="977"
    src="https://teleport.org/assets/firefly/widget-snippet.min.js"
  ></script>
    `;

    $("#final-widget").empty();
    $("#final-widget").append(teleport);
  }

  // FUNCTION CALLS

  //getQualityOfLife();

  // EVENT LISTENERS
  $("#submit-city").on("click", function (event) {
    event.preventDefault();
    $("#home-page").addClass("d-none");
    $("#school-list").removeClass("d-none");
    // variable to search API by city
    var city = userCity.value;
    getCollegesByCity(city);
  });

  // listens for the university search button to populate the university names
  $("#submit-school").on("click", function (event) {
    event.preventDefault();
    $("#home-page").addClass("d-none");
    $("#school-list").removeClass("d-none");
    finalSchool = false;
    var school = userSchool.val();
    getCollegeInfo(school);
  });

  // event listener to create school page
  // $("#chosenbutton").on("click", "button", function (event) {
  //   event.preventDefault();
  //   $("#school-list").addClass("d-none");
  //   finalSchool = true;
  //   getCollegeInfo($(this).attr("school-name"));
  //   $("#final-page").removeClass("d-none");
  // });

  // event listener to create school page
  $("#chosenbutton").on("click", "button", function (event) {
    event.preventDefault();
    $("#school-list").addClass("d-none");
    finalSchool = true;
    getCollegeInfo($(this).attr("school-name"));
    getCity($(this).attr("school-city"));
    $("#final-page").removeClass("d-none");
  });
});
