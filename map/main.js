var mapDiv = document.getElementById("map");

// function to get the user address and zoom it in the map
function getUserLocation(url) {
  fetch(url , {
    method: 'GET',
    mode: 'cors', 
    credentials: 'include', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials' : true 
    }
  })
  .then((resp) => resp.json()) 
  .then(function(user) {
    map = new google.maps.Map(mapDiv, {
      zoom: 16.25,
      center: user.location,
      map: map
    });
    var marker = new google.maps.Marker({
      position: user.location,
      label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: (user.name +" "+ user.phone +" ",+ user.email)},
      map: map,
      icon: { 
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" 
        }
        
    });
    })
  .catch(function(error) {
    console.log('ERROR');
  }); 
}

function getMarkers(url, data = {}) {
  fetch(url,
    {
      method: 'GET',
      mode: 'cors', 
      credentials: 'include', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials' : true 
      },
    })
  .then((resp) => resp.json())
  .then(function(markers) {
    console.log('markers', markers);
    markers.forEach(marker => {
      addMarker(marker)
    });
   });
  }
  
function addMarker(marker) {
  var marker = new google.maps.Marker({
    position: marker.location,
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: '<div> marker.name </div>',
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
})
}  


function initMap() {
   
  getUserLocation("https://9ffcd8d52005.ngrok.io/user-marker")
  //getUserLocation("http://localhost:3000/user")

  //getMarkers("https://182f9ef1b67d.ngrok.io/markers");
  //getMarkers("http://localhost:3000/markers");

}


// POST
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    credentials: 'include', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials' : true 
    },
    body: JSON.stringify(data)
  });
  return response.json(); 
}

function filteredMarkers() {
  var selectedOption = [];
    var filters = {
      "institute": null,
      "major": null,
      "year": null,
      "course": null
  };
    var selectElements = document.getElementsByClassName('select');
    for(var i=0; selectElements[i]; ++i){
          var option = selectElements[i].options[selectElements[i].selectedIndex].value;
          selectedOption.push(option);
  }
  var i = 0;
  for (var key in filters) {
    if (filters.hasOwnProperty(key)) {
      if( selectedOption[i] != 0)
          filters[key] = selectedOption[i];
      }
    i++;
  }
  //to clean all markers
  getUserLocation("http://localhost:3000/user");
  console.log('filters', filters)

  //to get new markers
  postData("https://a56b3e4fbadd.ngrok.io/send-filter", filters)
  .then(function(markers) {
    console.log('filtered markers', markers);
    markers.forEach(marker => {
      addMarker(marker)
    });
   });

}
