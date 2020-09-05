function getUsers(url) {
    fetch(url,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
    .then((resp) => resp.json())
    .then(function(markers) {
      //console.log('markers', markers);
      markers.forEach(marker => {
        console.log('markers', marker);
      });
     });
}

getUsers("https://6c8872eeef8b.ngrok.io/user-table")


async function deleteReq(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : "*", 
        'Access-Control-Allow-Credentials' : true 
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
  }


function deleteUser(id) {
    var message = {"id": id}
    deleteReq(url, message);

  }