function checkIfExist() {
    var input = document.getElementById('emailInput').value; 
    var email = { "email" : input};
    console.log('user email', email);
    postData ("https://9ffcd8d52005.ngrok.io/login", email )
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


  