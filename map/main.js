var mapDiv = document.getElementById("map");

// function to get the user address and zoom it in the map
function getUserLocation(url) {
  fetch(url , {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin' : "*",
      'Access-Control-Allow-Credentials' : true 
    },
    //redirect: 'follow', // manual, *follow, error
   // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(user) {
    map = new google.maps.Map(mapDiv, {
      zoom: 16.25,
      center: user.location,
      map: map
    });
    var marker = new google.maps.Marker({
      position: user.location,
      label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: (user.name +'\n'+ user.phone + user.email)},
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
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Credentials' : true,
        //'Access-Control-Allow-Origin' : "*"
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
  // var userInfo = 
  // '<div> marker.name </div>'+
  // '<div> marker.phone </div>' +
  // '<div> marker.email </div>';
  var infowindow = new google.maps.InfoWindow({
    content: '<div> marker.name </div>',
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
})
}  


function initMap() {
   
  getUserLocation("https://182f9ef1b67d.ngrok.io/user-marker")
  //getUserLocation("http://localhost:3000/user")

  //getMarkers("https://182f9ef1b67d.ngrok.io/markers");
  //getMarkers("http://localhost:3000/markers");

}

  // geocoding api
//   function geocodeAddress(geocoder) {
//     //const address = document.getElementById("address").value;
//     const address = "רחוב הסתדרות 32, Holon"
//     geocoder.geocode({ address: address }, (results, status) => {
//       if (status === "OK") {
//         var latitude = results[0].geometry.location.lat();
//         var longitude = results[0].geometry.location.lng();
//         console.log('latitude', latitude);
//         console.log('longitude', longitude);
//       } else {
//         alert("Geocode was not successful for the following reason: " + status);
//       }
//     });

// }



//Fetch Get[]
function getUsers(url){
  fetch(url,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
    ).then(response=> response.json())
    .then(res=>{
    console.log('final ', res.test)
  })
}

//getUsers("https://6c8872eeef8b.ngrok.io/test");



// POST
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials' : true 
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// postData("https://6c8872eeef8b.ngrok.io/add-user", {"name": "ddfssron", "email": "eelish@gmail.com"} )
//   .then(data => {
//     console.log('status',data); // JSON data parsed by `data.json()` call
//   })


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
