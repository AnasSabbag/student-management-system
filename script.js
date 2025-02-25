let studentArray = []
let table2=false;
async function fetchJsonData() {
  try {
      // Fetch the JSON file
      let response = await fetch('./student.json');
      
      // Check if the response is OK
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      
      // Parse the JSON data
      studentArray = await  response.json();
      updateStudentData();
      // Log the JSON data to the console
      
  } catch (error) {
      console.log('There was a problem with the fetch operation:', error);
  }
}
// Call the function to fetch and read JSON data
fetchJsonData();


function updateStudentData(){
  let arr=document.getElementById("student-body-data");

  arr.innerHTML=``;

  studentArray.forEach((student,_index)=>{
  arr.innerHTML += `
      <tr>
          <td>${student.id}</td>
          <td class="name-class"> <div class="img-class"><img src='${student.img_src}'></div><p>${student.first_name} ${student.last_name}</p></td>
          <td>${student.gender}</td>
          <td>${student.class}</td>
          <td>${student.marks}</td>
          <td>${student.passing}</td>
          <td>${student.email}</td>
      </tr>
  ` 
  });

}
function updateStudentData2(){
  if(table2){
    document.getElementById("student-table-2").style.display = "none";
    table2=false;
    fetchJsonData();
    return;
  }

  let arr=document.getElementById("student-body-data-2");
  arr.innerHTML=``;
  studentArray.forEach((student,_index)=>{
  arr.innerHTML += `
      <tr>
          <td>${student.id}</td>
          <td class="name-class"> <div class="img-class"><img src='${student.img_src}'></div><p>${student.first_name} ${student.last_name}</p></td>
          <td>${student.gender}</td>
          <td>${student.class}</td>
          <td>${student.marks}</td>
          <td>${student.passing}</td>
          <td>${student.email}</td>
      </tr>
  ` 
  });
  
  let table = document.getElementById("student-table-2");
  table.style.display = "block";
  table2=true;
  console.log(document.getElementById("student-table-2").style);

}

function sortAtoZ(){
  console.log("sortAtoZ");
  studentArray.sort(function(a,b){
    if((a.first_name+a.last_name) > (b.first_name+b.last_name)){
      return 1;
    }
    if((a.first_name+a.last_name) < (b.first_name+b.last_name)){
      return -1;
    }
    return 0;
  })
  updateStudentData();




}

function sortZtoA(){
  studentArray.sort(function(a,b){
      if((a.first_name+a.last_name) < (b.first_name+b.last_name)){
        return 1;
      }
      if((a.first_name+a.last_name) > (b.first_name+b.last_name)){
        return -1;
      }
      return 0;
  })

  updateStudentData();
  console.log("sortZtoA");

}

function sortByMarks(){
  studentArray.sort(function(a,b){
      if(a.marks > b.marks){
        return 1;
      }
      if(a.marks < b.marks){
        return -1;
      }
      return 0;
  })

  updateStudentData();

  console.log("sortByMarks");
}

function sortByPassing(){

  
  studentArray=studentArray.filter((student)=>{
    return student.passing;
  });
  updateStudentData();
  console.log("sortByPassing");
}

function sortByClass(){
  studentArray.sort(function(a,b){
    if(a.class > b.class){
      return 1;
    }
    if(a.class < b.class){
      return -1;
    }
    return 0;
})

updateStudentData();
  console.log("sortByClass");
}



function sortByGender(){
  let maleStudents = studentArray.filter((student) => {
      return student.gender==="Male";
            
  });
  let femaleStudents = studentArray.filter((student) => {
      return student.gender==="Female";
            
  });

  // studentArray=filteredStudents;
  //Sort by gender: Display two tables, one for female students and one for male students, shown one below the other.

  //for table 1:
  studentArray=femaleStudents;
  updateStudentData();

  studentArray=maleStudents;
  updateStudentData2();

  console.log("sortByGender");
}

function handleSearchQuery(){
  let searchTerm = document.getElementById("input-search").value.toLowerCase();
  let filteredStudents = studentArray.filter((student) => {
      return student.first_name.toLowerCase().includes(searchTerm) ||
             student.last_name.toLowerCase().includes(searchTerm) ||
             student.email.toLowerCase().includes(searchTerm);
  });
  studentArray=filteredStudents;
  updateStudentData();
  console.log(searchTerm);
}