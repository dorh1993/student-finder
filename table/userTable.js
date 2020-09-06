var users = null;
function getUsers(url) {
  fetch(url,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    .then((resp) => resp.json().then(usersResp => {
      users = usersResp;
      creatTable(users);
    }));
  // .then(function(markers) {
  //   //console.log('markers', markers);
  //   markers.forEach(marker => {
  //     console.log('markers', marker);
  //   });
  //  });
}

getUsers("https://8572d773af04.ngrok.io/user-table")


async function deleteReq(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Credentials': true
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}


function deleteUser(id) {
  var message = { "id": id }
  deleteReq(url, message);

}

function creatTable(users) {
  var col = [];
  for (var i = 0; i < users.length; i++) {
    for (var key in users[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  var table = document.getElementById("eden");


  // var tr = table.insertRow(-1);                   // TABLE ROW.

  // for (var i = 0; i < col.length; i++) {
  //     var th = document.createElement("th");      // TABLE HEADER.
  //     th.innerHTML = col[i];
  //     tr.appendChild(th);
  // }

  for (var i = 0; i < users.length; i++) {

    tr = table.insertRow(-1);

    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      if (col[j] === "id") {
        var btn = document.createElement("BUTTON");
        btn.innerHTML = "X";
        btn.setAttribute("id", users[i][col[j]]);
        btn.id = users[i][col[j]];
        btn.onclick = onDelete;
        tabCell.appendChild(btn);
        continue;
      }
      tabCell.innerHTML = users[i][col[j]];
    }
  }

  // var divContainer = document.getElementById("showData");
  // divContainer.innerHTML = "";
  // divContainer.appendChild(table);
}

function onDelete() {
  deleteUser(event.srcElement.id);
}
