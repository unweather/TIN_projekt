let count = -1;
let suma = 0;
let selectedID = 0;

function User(firstName, secondName, tips = 0) {
  this.firstName = firstName;
  this.secondName = secondName;
  this.tips = Number(tips);

  this.changeFirstName = function (newFirstName) {
    firstName = newFirstName;
  };
  this.changeSecondName = function (newSecondName) {
    secondName = newSecondName;
  };
  this.giveATip = function (x) {
    tips += x;
  };
};

let user1 = new User('Mateusz', 'Niepogoda');
let user2 = new User('Jan', 'Kowalski');

let myData = {
  map: new Map([
    [++count, user1],
    [++count, user2]
  ]),

  size() {
    return this.map.size;
  },
  addData(user) {
    this.map.set(++count, user);
  },
  deleteData(id) {
    this.map.delete(id);
  },
  updateMap(newMap) {
    this.map = newMap;
  }
};

function loadData() {
  var table = document.getElementById('myTable');
  for (let i = table.rows.length - 2; i > 0; i--) {
    table.deleteRow(i);
  };

  var map = myData.map;
  for (let id of map.keys()) {
    var row = table.insertRow(table.rows.length - 1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);

    cell0.innerHTML = id;
    cell1.innerHTML = `<span class="select" onclick='selectUser(this)'>${map.get(id).firstName}</span>`;
    cell2.innerHTML = `<span class="select" onclick='selectUser(this)'>${map.get(id).secondName}</span>`;
    cell3.innerHTML = map.get(id).tips + "zł";
    cell4.innerHTML = '<i class="far fa-trash-alt" onclick="deleteData(this)"></i>';
  }
};

function deleteData(obj) {
  var row = obj.parentNode.parentNode;
  var id = row.cells.item(0).innerHTML;
  myData.deleteData(Number(id));
  loadData();
};

function addData() {
  var newFirstName = document.getElementById('add_firstName').value;
  var newSecondName = document.getElementById('add_secondName').value;
  var newTips = document.getElementById('add_tips').value;

  if (newFirstName.length < 2) {
    alert("Za krótkie imię");
    return;
  }
  if (newSecondName.length < 2) {
    alert("Za krótkie nazwisko");
    return;
  }
  if (newTips < 0) {
    alert("Ujemna kwota napiwku");
    return;
  }
  if (newTips.length < 1) {
    alert("Wprowadź napiwek");
    return;
  }

  var newUser = new User(newFirstName, newSecondName, newTips);
  myData.addData(newUser);
  loadData();
}

function tip(x) {
  suma += x;
  document.getElementById('total').innerHTML = "SUMA: " + suma + "zł";
}
function resetTotal() {
  suma = 0;
  tip(0);
}

function selectUser(obj) {
  var row = obj.parentNode.parentNode;
  selectedID = Number(row.cells.item(0).innerHTML);
  document.getElementById('selectedUser').innerHTML = "Wybrałeś: " + row.cells.item(1).innerHTML + " " + row.cells.item(2).innerHTML;
}

function submitTip() {
  if (!myData.map.has(selectedID))
    return;
  else {
    var selectedUser = myData.map.get(selectedID);
    var newUser = new User(selectedUser.firstName, selectedUser.secondName, selectedUser.tips + suma);
    myData.deleteData(selectedID);
    myData.addData(newUser);
    loadData();
    resetTotal();
    selectedID = count;
  }
}

