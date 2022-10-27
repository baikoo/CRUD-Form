//get Elements from the DOM
const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const address = document.getElementById("address");
const addressArea = document.getElementById("limit");
const limit = 35;
addressArea.textContent = 0 + "/" + limit;

fname.addEventListener("blur", validateFirstName);
lname.addEventListener("blur", validateLastName);

//address limit validations
address.addEventListener("input", () => {
    var textLength = address.value.length;
    addressArea.textContent = textLength + "/" + limit;

    if (textLength > limit) {
        document.getElementById("error").innerHTML = "35 character limit!";
        address.style.borderColor = "#c4141a";
        addressArea.style.color = "#c4141a";
    } else {
        document.getElementById("error").innerHTML = " ";
        address.style.borderColor = "#b2b2b2";
        addressArea.style.color = "#b2b2b2";
    }
});

//name validation functions
function validateFirstName() {
    const regEx_firstName = /^[A-Za-z]+$/;

    if (!regEx_firstName.test(firstName.value)) {
        document.getElementById("validationFirst").style.color = "red";
    } else {
        document.getElementById("validationFirst").style.color = "green";
    }
}

function validateLastName() {
    const regEx_lastName = /^[A-Za-z]+$/;

    if (!regEx_lastName.test(lastName.value)) {
        document.getElementById("validationLast").style.color = "red";
    } else {
        document.getElementById("validationLast").style.color = "green";
    }
}


//localstorage

function addData() {
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
    var tbl = document.getElementById("tbl");
    var r = tbl.insertRow();
    var cell0 = r.insertCell();
    var cell1 = r.insertCell();
    var cell2 = r.insertCell();
    var cell3 = r.insertCell();
    var cell4 = r.insertCell();
    var cell5 = r.insertCell();
    var cell6 = r.insertCell();

    cell0.innerHTML = arr.length - 1;
    cell1.innerHTML = document.getElementById("fname").value;
    cell2.innerHTML = document.getElementById("lname").value;
    cell3.innerHTML = document.getElementById("address").value;
    cell4.innerHTML = document.getElementById("gender").value;
    cell5.innerHTML = document.getElementById("birthday").value;
    cell6.innerHTML = document.getElementById("textArea").value;
    cell7.innerHTML = "<button>delete</button>";
}

function getData() {
    var str = localStorage.getItem("localData");
    if (str != null) {
        arr = JSON.parse(str);
    }
}

function deleteData() {
    localStorage.clear();
}

function showData() {
    getData();
    var tbl = document.getElementById("tbl");
    for (let i = 0; i < arr.length; i++) {
        let r = tbl.insertRow();
        let cell0 = r.insertCell();
        let cell1 = r.insertCell();
        let cell2 = r.insertCell();
        let cell3 = r.insertCell();
        let cell4 = r.insertCell();
        let cell5 = r.insertCell();
        let cell6 = r.insertCell();
        let cell7 = r.insertCell();

        cell0.innerHTML = i;
        cell1.innerHTML = arr[i].fname;
        cell2.innerHTML = arr[i].lname;
        cell3.innerHTML = arr[i].address;
        cell4.innerHTML = arr[i].gender;
        cell5.innerHTML = arr[i].birthday;
        cell6.innerHTML = `<h5 onClick="openModalButtons(${i})">${arr[i].textArea}</h5>`;
        cell7.innerHTML = `<button class="btn btn-dark" onClick="delete0(${i})">delete</button>`;
    }
}

// const popup = (id) => {
//   console.log("popup", id);
//   document.querySelector(
//     "body"
//   ).innerHTML += `<div class="popup"><h4>${arr[id].textArea}</h4></div>`;
// };

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

//popup
const openModalButtons = document.querySelectorAll('[data-model-target]')
const closemodalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(th => {
    th.addEventListener('click', () => {
        const modal = document.querySelector(tr.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(th => {
    th.addEventListener('click', () => {
        const modal = document.closest('.popup')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}


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