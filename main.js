var show = true; 

function showCheckboxes() { 
  var checkboxes =  document.getElementById("checkBoxes"); 
    if (show) { 
        checkboxes.style.display = "block"; 
        show = false; 
    } else { 
        checkboxes.style.display = "none"; 
        show = true; 
    } 
} 

const academies = ['HIT', 'Tel-Aviv', 'Ben-Gurion' ,'Afeka', 'Shenkar']
function getDisctricList(){
  var x = document.getElementsByClassName("academy-select").value;
  var items;

}

function initMap() {
  var location = {
    lat: 32.016510,
    lng: 34.771410
  }
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16.25,
    center: location,
    map: map
  });
}



function getHello() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            document.getElementById("test").innerHTML = response;
        }
    };
    xhttp.open("GET", "http://localhost:3000/hello", true);
    xhttp.send();
}


const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.querySelector(".doggos");

function addNewDoggo() {
  const promise = fetch(DOG_URL);
  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    });
}

//document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);  
