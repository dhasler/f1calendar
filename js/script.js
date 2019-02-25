var xmlhttp = new XMLHttpRequest();
var url = "./assets/race-data.json";
loadJSON(myFunction);

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

function myFunction(arr) {
  var racesData = arr.raceData;
  console.log(racesData);
  var out = "";
  var i;
  for (i = 0; i < racesData.length; i++) {
    out += '<a href="#">' + racesData[i].raceName + "</a><br>";
  }
  document.getElementById("raceArea").innerHTML = out;
}
