//get Elements from the DOM
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const address = document.getElementById("address");
const addressArea = document.getElementById("limit");
const select = document.getElementById("gender");
const inputs = document.querySelectorAll('input');
const submit = document.getElementById("submit");
const limit = 35;
addressArea.textContent = 0 + "/" + limit;

fname.addEventListener("blur", validateFirstName);
lname.addEventListener("blur", validateLastName);

//reset input fields
submit.addEventListener("click", () => {
    inputs.forEach(input => input.value = '');
        
    });
//address limit validations
address.addEventListener("input", () => {
  var textLength = address.value.length;
  addressArea.textContent = textLength + "/" + limit;

  if (textLength > limit) {
    document.getElementById("error").innerHTML = "35 character limit!";
    address.style.borderColor = "#c4141a";
    addressArea.style.color = "#c4141a";
    return false;
  } else {
    document.getElementById("error").innerHTML = " ";
    address.style.borderColor = "#b2b2b2";
    addressArea.style.color = "#b2b2b2";
    return true;
  }
});

//name validation functions
function validateFirstName() {
  const regEx_firstName = /^[A-Za-z]+$/;

  if (!regEx_firstName.test(firstName.value)) {
    document.getElementById("validationFname").innerHTML =
      "No digits and special characters";
    document.getElementById("validationFname").style.color = "red";
    return false;
  } else {
    document.getElementById("validationFname").innerHTML =
      " ";
    return true;
  }
}

function validateLastName() {
  const regEx_lastName = /^[A-Za-z]+$/;

  if (!regEx_lastName.test(lastName.value)) {
    document.getElementById("validationLname").innerHTML =
      "No digits and special characters";
    document.getElementById("validationLname").style.color = "red";
    return false;
  } else {
    document.getElementById("validationLname").innerHTML =
      " ";
    return true;
  }
}

//localstorage

function addData() {
  if (validateLastName() && validateFirstName()) {
    getData();
    arr.push({
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      address: document.getElementById("address").value,
      gender: document.getElementById("gender").value,
      birthday: document.getElementById("birthday").value,
      textArea: document.getElementById("textArea").value,
    });

    localStorage.setItem("localData", JSON.stringify(arr));
    getData();

    document.getElementById("tbl").innerHTML += `
        <tr onClick="popupShow(${arr.length - 1})">
            <td>${arr.length - 1}</td>
            <td>${document.getElementById("fname").value}</td>
            <td>${document.getElementById("lname").value}</td>
            <td>${document.getElementById("address").value}</td>
            <td>${document.getElementById("birthday").value}</td>
            <td>${document.getElementById("gender").value}</td>
            <td><button class="btn btn-dark" onClick="delete0(${arr.length - 1})">delete</button></td>
        </tr>
        `;
  } else {
    //pass
  }
}

function getData() {
  let str = localStorage.getItem("localData");
  if (str != null) {
    arr = JSON.parse(str);
  }
}

function deleteData() {
  localStorage.clear();
}

function showData() {
  getData();
  for (let i = 0; i < arr.length; i++) {
    document.getElementById("tbl").innerHTML += `
    <tr onClick="popupShow(${i})">
      <td>${i}</td>
      <td>${arr[i].fname}</td>
      <td>${arr[i].lname}</td>
      <td>${arr[i].address}</td>
      <td>${arr[i].gender}</td>
      <td>${arr[i].birthday}</td>
      <td><button class="btn btn-dark" onClick="delete0(${i})">delete</button></td>
    </tr>
    `;
  }
}

const popupShow = (id) => {
  document.getElementById("topFrame").innerHTML = `
  <div class="popup text-center position-fixed" id="modal">
  <div class="modal-header">
    <div class="title">Notes</div>
    <button data-close-button class="close-button" onClick="popupHide()">&times;</button>
  </div>
  <div class="modal-body" id="modal-body">${arr[id].textArea}</div>
  <div id="overlay"></div>
  </div>
  `;
};

const popupHide = () => {
  document.getElementById("topFrame").innerHTML = "";
};

const delete0 = (id) => {
  if (id > -1) arr.splice(id, 1);
  deleteData();
  localStorage.setItem("localData", JSON.stringify(arr));

  document.getElementById("tbl").innerHTML = "";
  showData();
};

//localstorage
var arr = [];
showData();

// //Submitting data in table without LocalStorage

// function insert() {
//   var fname = document.getElementById("fname").value;
//   var lname = document.getElementById("lname").value;
//   var addressAdd = document.getElementById("address").value;
//   var gender = document.getElementById("gender").value;
//   var birthday = document.getElementById("birthday").value;

//   var notes = document.getElementById("textArea").value;
//   var tbodyRef = document.getElementById("tbl");

//   var table = `<tr>
//                     <td>${tbodyRef.rows.length + 1}</td>
//                     <td>${fname}</td>
//                     <td>${lname}</td>
//                     <td>${addressAdd}</td>
//                     <td>${gender}</td>
//                     <td>${birthday}</td>
//                     <td>${notes}</td>
//                     <td><button type="button" class="deleteBtn btn btn-dark">Delete</button></td>
//                 </tr>`;
//   document.getElementById("tbl").innerHTML += table;

//   // //Delete row
//   var tableEl = document.querySelector("table");
//   function onDeleteRow(e) {
//     if (!e.target.classList.contains("deleteBtn")) {
//       return;
//     }
//     const btn = e.target;
//     btn.closest("tr").remove();
//   }

//   tableEl.addEventListener("click", onDeleteRow);
// }