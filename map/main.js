var mapDiv = document.getElementById("map");
var url = "https://8e3111f42b8e.ngrok.io";

var allUsers = document.getElementsByClassName("all-users-admin")[0];

function changeUserDisplay(){ 
  allUsers.style.display = "initial";
}

// function to get the user address and zoom it in the map
function getUserLocation(url) {
  fetch(url + "/user-marker" , {
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
    console.log('user',user)
    map = new google.maps.Map(mapDiv, {
      zoom: 16.25,
      center: user.location,
      map: map
    });
    var marker = new google.maps.Marker({
      position: user.location,
      label: { color: 'black', fontWeight: 'bold', fontSize: '14px', text: 'Me!'},
      map: map,
      icon: { 
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" 
        }
        
    });
    if( user.email == "admin"){
       changeUserDisplay();
       }
    })
  .catch(function(error) {
    console.log('ERROR');
  }); 
}

function getMarkers(url, data = {}) {
  fetch(url + "/users-marker",
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
    label: { color: '#386188', fontWeight: 'bold', fontSize: '14px', text: (marker.name + ' ' + marker.phone + ' ' + marker.email)},
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
   
  getUserLocation(url)
  //getUserLocation("http://localhost:3000/user")

  getMarkers(url);
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
  console.log('cookie', document.cookie)
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
  getUserLocation(url);
  console.log('filters', filters)

  //to get new markers
  postData(url + "/send-filter", filters)
  .then(function(markers) {
    console.log('filtered markers', markers);
    markers.forEach(marker => {
      addMarker(marker)
    });
   });

}


