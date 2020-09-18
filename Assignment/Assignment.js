var arr=[];
var itemToUpdate = 0;

function display() {
    var a = "<tr><th>#</th><th>First Name</th><th>Last Name</th><th>Superhero Name</th><th>Email</th><th>Gender</th><th>Age</th><th>DELETE ITEM</th><th>EDIT ITEM</th></tr>";
    for (let i = 0; i < arr.length; i++) {
       
        a += "<tr>";
        a += "<td><input type='checkbox' class='select'></td>";
        a += "<td>" + arr[i].firstname + "</td>";
        a += "<td>" + arr[i].lastname + "</td>";
        a += "<td>" + arr[i].hero + "</td>";
        a += "<td>" + arr[i].email + "</td>";
        a += "<td>" + arr[i].gender + "</td>";
        a += "<td>" + arr[i].age + "</td>";
        a += `<td><button onclick="deletes(${i})" class = "btn btn-danger">Delete Item</button></td>`;
        a += `<td><button onclick="Edit(${i})" data-toggle="modal" data-target="#myModal" class ="btn btn-success"> Edit Item</button></td>`;
        a += "</tr>";
    }
    document.getElementById("record_contant").innerHTML = a;

    // for sort the table...
    var table, rows, switching, i, x, y, shouldSwitch,dir,switchcount=0;
    table = document.getElementById("record_contant");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;

        for(i=1; i<(rows.length - 1); i++){
            shouldSwitch = false;

            x = rows[i].getElementsByTagName('TD')[1];
            y = rows[i + 1].getElementsByTagName('TD')[1];
            if(dir == "asc"){
            if(x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
                shouldSwitch = true;
                break;
            }
            }else if(dir == "desc"){
                if(x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()){
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if(shouldSwitch){
            rows[i].parentNode.insertBefore(rows[i+1],rows[i]);
            switching = true;
            switchcount ++;
        }else{
            if(switchcount == 0 && dir == "asc"){
                dir = "desc";
                switching = true;
            }
        }
    }
}
getData();
display();

//--for search input--//
function myFunction() {
    var input, filter, table, tr, td, i,j, found;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('record_contant');
    tr = table.getElementsByTagName('tr');
    for (i=0; i< tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for(j=0; j< td.length; j++){
          if(td[j].innerHTML.toUpperCase().indexOf(filter) > -1){
              found = true;
            }
        }
        if(found){
            tr[i].style.display = "";
            found = false;
        }else{
            tr[i].style.display = "none";
        }
    }
}     
getData();
display();

function addRecord(){

    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var hero = document.getElementById('hero').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender').value;
    var age = document.getElementById('age').value

    if (firstname != "" && lastname != "" && hero !="" && email != "" && gender !="" && age != "") {
         arr.push({
             firstname: firstname,
             lastname: lastname,
             hero: hero,
             email: email,
             gender: gender,
             age: age
         });     
        display();
        saveData();
        
    }   else {
         alert("Please Fill all details");
        }

    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("hero").value = "";
    document.getElementById('email').value = "";
    document.getElementById('gender').value ="";
    document.getElementById('age').value ="";
};

function deletes(i){            
    arr.splice(i,1);
    localStorage.setItem('arr',JSON.stringify(arr));
    display();
}

// delete @ checkbox
function deleteRow() {
    document.querySelectorAll('#record_contant .select:checked').forEach(e => {
      e.parentNode.parentNode.remove()
    });
  }
  display();
  getData();
  
function Edit(item) {
    itemToUpdate = item;
  
    document.getElementById("firstname").value = arr[item].firstname;
    document.getElementById("lastname").value = arr[item].lastname;
    document.getElementById("hero").value = arr[item].hero;
    document.getElementById('email').value = arr[item].email;
    document.getElementById('gender').value = arr[item].gender;
    document.getElementById('age').value = arr[item].age;
   
    console.log(arr, "Editted Button Successfully worked");      
}

function update() {
    var data = {};
    data["firstname"] = document.getElementById("firstname").value;
    data["lastname"] = document.getElementById("lastname").value;
    data["hero"] = document.getElementById("hero").value;
    data["email"] = document.getElementById("email").value;
    data["gender"] = document.getElementById("gender").value;
    data["age"] = document.getElementById("age").value;
    arr.splice(itemToUpdate, 1, data);
    display();
    saveData();

    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("hero").value = "";
    document.getElementById('email').value = "";
    document.getElementById('gender').value = "";
    document.getElementById('age').value = "";
}

//----LocalStorage----//

function saveData(){
    var str = (JSON.stringify(arr));
    localStorage.setItem('arr',str);
}

function getData(){
    var str = localStorage.getItem(arr);
    arr = JSON.parse(str);
    if (!arr) {
        arr = [];
    }
}
getData();
display();
