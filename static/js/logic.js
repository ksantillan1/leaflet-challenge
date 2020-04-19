// Creating map object
var map = L.map("map", {
  center: [40.00, -110.00],
  zoom: 4.5
});


const API_KEY = "pk.eyJ1Ijoia3NhbnRpbGxhbiIsImEiOiJjazhqY2IyaGwwZmQ5M2ZwbDBlaGcxNnc5In0.Ra4gZmwt7km977rqQF0erA";

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);



var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



d3.json(link, function(data) {

  console.log(data)

  var featuresarray = data.features
  
  
  for (var i = 0; i < featuresarray.length; i++) {
 
  var mycoordinates= featuresarray[i].geometry.coordinates
  var magnitud = featuresarray[i].properties.mag
  var mysize = magnitud*11000
  var myplace = featuresarray[i].properties.place
  var mytype = featuresarray[i].properties.type
  
  
  var color = "";
  if (mysize > 55000) {
    color = "#DE2D10";
  }
  else if (mysize > 44000) {
    color = "#F08418";
  }
  else if (mysize > 33000) {
    color = "#E49B24";
  }
  else if (mysize > 22000) {
    color = "#E9BE1F";
  }
  else if (mysize > 11000) {
    color = "#DEE820";
  }
  else {
    color = "#AFF513";
  }
  
  

  
    L.circle([mycoordinates[1],mycoordinates[0]], {
      stroke: true,
      fillOpacity: 0.75,
      color: "black",
	  weight: 0.25,
      fillColor: color,
      radius: mysize
    }).bindPopup("<h1>" + mytype + "</h1> <hr> <h3>Magnitud: " + magnitud + "</h3> <hr> <h3>Place: " + myplace + "</h3>").addTo(map)

   }
   
   function getColor(d) {
    return d > 5 ? '#DE2D10' :
           d > 4 ? '#F08418' :
           d > 3 ? '#E49B24' :
           d > 2 ? '#E9BE1F' :
           d > 1 ? '#DEE820' :
                       '#AFF513';
	} 
  
  var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
	};

	legend.addTo(map);
  
 
});

