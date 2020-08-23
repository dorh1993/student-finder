
function initMap() {
    
  var location = {
    lat: 32.016510,
    lng: 34.771410
  }
  
  var location2 = {
    lat:32.0171363,
    lng: 34.7697293
  }

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16.25,
    center: location,
    map: map
  });

  
  function addMarker(coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: map
    });
  }


//Get
  function getALLMarkers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            response.forEach(element => {
              addMarker(element.location);
            });
        }
    };
    xhttp.open("GET", "http://localhost:3000/hello", true);
    xhttp.send();
}

getALLMarkers();

}



//Post
var email = "shlomi@gmail.com";
var password = "123456";

function createMessage(email, pass) {
  var message =  { "email" : email,"pass" : pass};
    return message
}

function sendLogin(email, pass){
  var message = createMessage("shlomi@gmail.com", "123456");
  postUser(message);
}

function postUser(message) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("POST", "http://localhost:3000/save-user", true);
  xhttp.setRequestHeader({ 'Content-Type': 'application/json'});
  xhttp.send(message);
}

//sendLogin();


// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*", 
      "Access-Control-Allow-Credentials" : true 
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response // parses JSON response into native JavaScript objects
}

postData("https://4f62e20490a1.ngrok.io/add-user", {name: "Dor", email: "dor12@gmail.com", password: "Newyork12312"} )
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });


  // postData("https://4f62e20490a1.ngrok.io/add-user", {name: "Dor", email: "dor12@gmail.com", password: "Newyork12312"} )
  // .then(response => response.json())
  //  .then(function (data) {
  //    console.log(data)
  //   });
// postData("https://4f62e20490a1.ngrok.io/test", {name: "John", age: 31, city: "New York"} )
// .then(data => {
//   console.log(data); // JSON data parsed by `data.json()` call
// })