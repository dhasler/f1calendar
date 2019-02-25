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
    out +=
      '<div class="race"><div class="race-image"><img src="./assets/tracks/circuit-' +
      racesData[i].round.replace(" ", "_") +
      '.svg" /></div><a href="#">' +
      racesData[i].round +
      "</a><br></div>";
  }
  document.getElementById("raceArea").innerHTML = out;
}
