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

function raceSetup(arr) {
  var racesData = arr.raceData;
  console.log(racesData);
  var out = "";
  var i;
  for (i = 0; i < racesData.length; i++) {
    var fp1Time = moment(new Date(racesData[i].fp1)).utcOffset(0);
    console.log(fp1Time);

    out +=
      '<div class="race"><h3>' +
      racesData[i].round +
      '</h3><div class="race-content">' +
      '<div class="race-image">' +
      '<object type="image/svg+xml" data="./assets/tracks/circuit-' +
      racesData[i].round.replace(" ", "_") +
      '.svg"></object></div>' +
      '<div class="race-times">' +
      "<p>FP1:</p>" +
      "<p>FP2:</p>" +
      "<p>FP3:</p>" +
      "<p>Q:</p>" +
      "<p>R:</p>" +
      "</div>" +
      "</div></div>";
  }
  document.getElementById("raceArea").innerHTML = out;
}
