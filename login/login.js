function checkIfExist() {
    var input = document.getElementById('emailInput').value; 
    var email = { "email" : input};
    console.log('user email', email);
    postData("https://6c8872eeef8b.ngrok.io/login", email )
    .then(response => {
      console.log('response', response)
        if (response.status = 'success'){
          setTimeout(function(){
            window.location.href = "file:///C:/Git/student-finder/map/index.html";
          }, 15000) 
        }
        else {
          setTimeout(function(){
            window.location.href = "file:///C:/Git/student-finder/registration/signUp.html"
          }, 15000) 
        }
  })
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'no-cors',
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Access-Control-Allow-Credentials' : 'true',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : "*", 
  
      },
      body: JSON.stringify(data)
    });
    //console.log('fetch response', response.statusCode);
    return response.json()
  }


  