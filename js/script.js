var xmlhttp = new XMLHttpRequest();
var url = "https://dhasler.github.io/f1calendar/assets/race-data.json";
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
var nextRace;
var racePast = false;
function raceSetup(arr) {
  var racesData = arr.raceData;
  console.log(racesData);
  var out = "";
  var i;
  for (i = 0; i < racesData.length; i++) {
    var fp1Time = moment(new Date(racesData[i].fp1)).utcOffset(0);
    var fp2Time = moment(new Date(racesData[i].fp2)).utcOffset(0);
    var fp3Time = moment(new Date(racesData[i].fp3)).utcOffset(0);
    var qualiTime = moment(new Date(racesData[i].qualifying)).utcOffset(0);
    var raceTime = moment(new Date(racesData[i].race)).utcOffset(0);

    console.log(raceTime - Date.now());

    if (racePast) {
      nextRace = racesData[i];
      racePast = false;
    }
    if (raceTime - Date.now() < 0) {
      racePast = true;
    }

    out +=
      '<div class="race"><h3>' +
      racesData[i].round +
      '</h3><div class="race-content">' +
      '<div class="race-image">' +
      '<object type="image/svg+xml" data="./assets/tracks/circuit-' +
      racesData[i].round.replace(" ", "_") +
      '.svg"></object></div>' +
      '<div class="race-times">' +
      createTime(fp1Time, "FP1") +
      createTime(fp2Time, "FP2") +
      createTime(fp3Time, "FP3") +
      createTime(qualiTime, "Q") +
      createTime(raceTime, "R") +
      "</div></div></div>";
  }
  console.log(nextRace);
  document.getElementById("raceArea").innerHTML = out;
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
