function checkIfExist() {
    var input = document.getElementById('emailInput').value; 
    var email = { "email" : input};
    console.log('user email', email);
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    postData ("https://182f9ef1b67d.ngrok.io/login", email )
    .then(response => {
      console.log('response', response)
        if (response.status == 'success'){
          setTimeout(function(){
            window.location.href = "http://83.130.145.225:8080/map";
          }, 7000) 
        }
        else {
          setTimeout(function(){
            window.location.href = "http://83.130.145.225:8080/registration/signUp.html"
          }, 7000) 
        }
  })
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin' : "*",
      'Access-Control-Allow-Credentials' : true 
    },
   // redirect: 'follow', // manual, *follow, error
   // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


  