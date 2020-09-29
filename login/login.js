var url = "http://51.103.51.122:8080/";

function checkIfExist() {
    var input = document.getElementById('emailInput').value; 
    var email = { "email" : input};
    console.log('user email', email);
    postData (url + "/login", email )
    .then(response => {
      console.log('response', response)
        if (response.status == 'success'){
          setTimeout(function(){
            window.location.href = "http://83.130.154.168:8080/map";
          }, 2000) 
        }
        else {
          setTimeout(function(){
            window.location.href = "http://83.130.154.168:8080/registration/signUp.html"
          }, 2000) 
        }
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
    body: JSON.stringify(data) 
  });
  return response.json(); 
}


  