var xmlhttp = new XMLHttpRequest();
var url = "https://dhasler.github.io/f1calendar/assets/race-data.json";
var f1CookieName = "f1TimeZone";
loadJSON(raceSetup);

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", url, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
}
var nextRace = null;
var racePast = false;

function raceSetup(arr) {
  var racesData = arr.raceData;
  var out = "";
  var i;

  var timeZone = getTimezone();

  for (i = 0; i < racesData.length; i++) {
    var fp1Time = moment(new Date(racesData[i].fp1)).utcOffset(0);
    var fp2Time = moment(new Date(racesData[i].fp2)).utcOffset(0);
    var fp3Time = moment(new Date(racesData[i].fp3)).utcOffset(0);
    var qualiTime = moment(new Date(racesData[i].qualifying)).utcOffset(0);
    var raceTime = moment(new Date(racesData[i].race)).utcOffset(0);

    if (racePast) {
      nextRace = racesData[i];
      racePast = false;
    }
    if (raceTime - Date.now() < 0) {
      racePast = true;
    }

    console.log(timeZone);

    out +=
      '<div id="' +
      convertToId(racesData[i].round) +
      '" class="race"><h3>' +
      racesData[i].round +
      '</h3><div class="race-content">' +
      '<div class="race-image">' +
      '<object type="image/svg+xml" data="./assets/tracks/circuit-' +
      racesData[i].round.replace(" ", "_") +
      '.svg"></object></div>' +
      '<div class="race-times">' +
      createTime(fp1Time.tz(timeZone), "FP1") +
      createTime(fp2Time.tz(timeZone), "FP2") +
      createTime(fp3Time.tz(timeZone), "FP3") +
      createTime(qualiTime.tz(timeZone), "Q") +
      createTime(raceTime.tz(timeZone), "R") +
      "</div></div></div>";
  }
  if (nextRace == null) {
    nextRace = racesData[0];
  }
  document.getElementById("raceArea").innerHTML = out;
  setNextRace(nextRace);
}

function getTimezone() {
  var timeZoneCookie = getCookie(f1CookieName);
  var timeZoneValue;
  console.log(timeZoneCookie);
  if (timeZoneCookie == "") {
    setCookie(f1CookieName, "GMT", 365);
    timeZoneValue = "GMT";
  } else {
    timeZoneValue = getCookie(f1CookieName);
  }

  //Create and append select list
  var tzholder = document.getElementById("current-tz");
  var selectList = document.createElement("select");
  var possTimeZones = moment.tz.names();
  selectList.id = "mySelect";
  tzholder.appendChild(selectList);
  for (var i = 0; i < possTimeZones.length; i++) {
    var option = document.createElement("option");
    option.value = possTimeZones[i];
    option.text = possTimeZones[i];
    selectList.appendChild(option);
  }
  selectList.value = timeZoneValue;
  selectList.addEventListener("change", restTimeZone);

  return timeZoneValue;
}

function restTimeZone(e) {
  var newtz = e.target.value;
  setCookie(f1CookieName, newtz, 365);
}

function setCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ) removed
    var expires = "; expires=" + date.toGMTString(); // + added
  } else var expires = "";
  document.cookie = name + "=" + value + expires + ";path=/"; // + and " added
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function createTime(timeUTC, event) {
  return (
    "<p class='time-line' data-time='" +
    timeUTC +
    "'><span class='event'>" +
    event +
    ":</span> " +
    "<span class='day'>" +
    timeUTC.format("MMM DD") +
    "</span>" +
    "<span class='time'>" +
    timeUTC.format("HH:mm") +
    "</span>" +
    "</p>"
  );
}

function setNextRace(nextRaceData) {
  var nextRaceElement = document.getElementById("next-race-data");
  var raceItem = document.getElementById(convertToId(nextRaceData.round));
  raceItem.classList.add("next-race");
  //nextRaceElement.innerHTML = "<h2>" + nextRaceData.round + "</h2>";
}

function convertToId(raceName) {
  return raceName.replace(" ", "").toLowerCase();
}
