function getUserInfo(url) {
    fetch(url,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
    .then((resp) => resp.json())
    .then(function(userInfo) {
      console.log('userInfo', userInfo);
      setDatafromJson(userInfo);
     });
    }
    


function setDatafromJson(user) {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("street").value = user.street;
    document.getElementById("streetNum").value = user.streetNum;
    document.getElementById("city").value = user.city;
    document.getElementById("country").value = user.country;
    document.getElementById("institute").value = user.institute;
    document.getElementById("year").value  = user.year;
    document.getElementById("major").value = user.major;
    var inputElements = document.getElementsByClassName('courses');
    (user.courses).forEach((value) => {
        console.log('value', value);
        inputElements[value-1].checked = true;
    })  
}


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
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
  }


function getCoordsFromAddress(){
    return new Promise(function(resolve, reject) {
    const address = buildAddress();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        resolve([results[0].geometry.location.lat(), results[0].geometry.location.lng()])
        console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng() );
      } else {
            reject(new Error('Couldnt\'t find the location ' + address));
      }
    });
    })
}


function buildMessage(coords) {
    
    // for input
    var street = document.getElementById("street").value;
    var streetNum = document.getElementById("streetNum").value;
    var city =document.getElementById("city").value;
    var country = document.getElementById("country").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    // for select
    var selectInstitute = document.getElementById("institute");
    var institute = selectInstitute.options[selectInstitute.selectedIndex].value;

    var selectYear = document.getElementById("year");
    var year = selectYear.options[selectYear.selectedIndex].value;

    var selectMajor = document.getElementById("major");
    var major = selectMajor.options[selectMajor.selectedIndex].value;


    // for checkbox
    var checkedCourses = []; 
    var inputElements = document.getElementsByClassName('courses');
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            checkedCourses.push(inputElements[i].value);
        }
    }

    var message = {
        "name": name,
        "email": email,
        "phone": phone,
        "street": street,
        "streetNum": streetNum,
        "city": city,
        "country": country,
        "coords" : coords,
        "institute": institute,
        "major": major,
        "year": year,
        "courses": checkedCourses
    }

 return message;
}

function buildAddress() {
    var street = document.getElementById("street").value;
    var streetNum = document.getElementById("streetNum").value;
    var city =document.getElementById("city").value;
    var country = document.getElementById("country").value;
   return (street +" "+  streetNum +" "+ city +" "+ country);
}


function sendInfo(){
    
function getPoints() {
    var locationData = [];
    for(var i = 0; i < 1; i++){
        locationData.push(getCoordsFromAddress())
    }
    return locationData // array of promises
}
var locations = getPoints()

Promise.all(locations)     
.then(function(returnVals){
   var coordsArray = returnVals.pop()
    var coords = {"lat" : coordsArray[0] , "lng" : coordsArray[1]}
    var message = buildMessage(coords);
    console.log('message', message)
    
    postData("https://6c8872eeef8b.ngrok.io/add-user", message )
    .then(data => {
      if (response.status == 'success'){
        setTimeout(function(){
          window.location.href = "http://83.130.145.225:8080/map";
        }, 7000) 
      }
    })
  })
  
}