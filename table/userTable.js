var users = null;
var url = "https://e410a45545c7.ngrok.io";

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

getUsers(url + "/user-table")


async function deleteReq(url, data) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
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

  var table = document.getElementById("eden");
  table.removeChild(table.childNodes);
  return response.json();
}


function deleteUser(id) {
  var message = { "id": id }
  deleteReq(url + "/delete-user", message);
}

function creatTable(users) {
  // get all table keys
  var col = [];
  for (var i = 0; i < users.length; i++) {
    for (var key in users[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // get table elment
  var table = document.getElementById("eden");
  for (var i = 0; i < users.length; i++) {

    tr = table.insertRow(-1);
    //fill data row b row
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
}

function onDelete() {
  deleteUser(event.srcElement.id).then(() => {
    var element = document.getElementById(event.srcElement.id);
    element.parentElement.parentElement(element.parentElement);
  });
}
