const addUserBtn = document.getElementById("addUser");
const btntxt = addUserBtn.innerText;
const usernameInput = document.getElementById("username");
const recordsDisplay = document.getElementById("records");
let userArray = [];
let edit_id = null;


let objStr = localStorage.getItem("users");
if (objStr != null) {
  userArray = JSON.parse(objStr);
}

DisplayInfo();
addUserBtn.onclick = () => {
  const name = usernameInput.value;
  if(edit_id != null){
    // edit
    userArray.splice(edit_id,1,{ name: name });
    edit_id = null;
  }else{
    // insert
    userArray.push({ name: name });
  }
  SaveInfo(userArray);
  usernameInput.value = '';
//   DisplayInfo();
  addUserBtn.innerHTML = btntxt;
};

function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
  DisplayInfo();
}

function DisplayInfo() {
  let statemnt = "";
  userArray.forEach((user, i) => {
    statemnt += `
        <tr>
        <th scope="row"> ${i+1} </th>
        <td>${user.name}</td>
        <td> <i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})' ></i> <i class="btn text-white fa fa-trash-o btn-danger" onclick='DeleteInfo(${i})'></i></td>
      </tr>`;
  });
  recordsDisplay.innerHTML = statemnt;
}

function EditInfo(id) {
    edit_id = id;
    usernameInput.value = userArray[id].name;
    addUserBtn.innerHTML = 'Save Edit'
}

function DeleteInfo(id) {
    userArray.splice(id,1);
    SaveInfo(userArray);
    // DisplayInfo();
}
