let students = [];
let deletedStack = [];
let present = 75.0;
let money = 'P';
let tdays = 1;

function addStudent() {
  const name = document.getElementById('name').value.trim();
  const rno = +document.getElementById('rno').value;
  const fees = document.getElementById('fees').value;
  const daysPresent = +document.getElementById('daysPresent').value;
  tdays = +document.getElementById('totalDays').value;

  if (!name || !rno || !tdays || !daysPresent) {
    alert("Please fill all fields.");
    return;
  }

  const attend = (daysPresent / tdays) * 100;
  students.push({ name, rno, fees, days: daysPresent, attend });
  alert("Student added!");
  clearInputs();
}

function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('rno').value = '';
  document.getElementById('fees').value = 'P';
  document.getElementById('daysPresent').value = '';
}

function printStudents() {
  displayTable(students);
}

function displayTable(data) {
  const tableDiv = document.getElementById("studentTable");

  if (data.length === 0) {
    tableDiv.innerHTML = "<p>No records to show.</p>";
    return;
  }

  let html = "<table><tr><th>Name</th><th>Roll No</th><th>Fees</th><th>Days</th><th>Attendance</th><th>Action</th></tr>";
  data.forEach((s, idx) => {
    html += `<tr>
      <td>${s.name}</td>
      <td>${s.rno}</td>
      <td>${s.fees}</td>
      <td>${s.days}</td>
      <td>${s.attend.toFixed(2)}%</td>
      <td><button onclick="deleteRecord(${s.rno})">Delete</button></td>
    </tr>`;
  });
  html += "</table>";
  tableDiv.innerHTML = html;
}

function deleteRecord(roll) {
  const index = students.findIndex(s => s.rno === roll);
  if (index !== -1) {
    deletedStack.push(students[index]);
    students.splice(index, 1);
    alert("Record deleted. You can undo this.");
    printStudents();
  } else {
    alert("Student not found.");
  }
}

function undoDelete() {
  if (deletedStack.length > 0) {
    const student = deletedStack.pop();
    students.push(student);
    alert("Undo successful.");
    printStudents();
  } else {
    alert("No record to undo.");
  }
}

function showEligible() {
  const eligible = students.filter(s =>
    (money === 'B' || s.fees === money) && s.attend >= present
  );
  displayTable(eligible);
}

function updateCriteria() {
  present = parseFloat(document.getElementById('minAttend').value);
  money = document.getElementById('feeCriteria').value;
  alert("Criteria updated.");
}

function resetCriteria() {
  present = 75.0;
  money = 'P';
  document.getElementById('minAttend').value = 75;
  document.getElementById('feeCriteria').value = 'P';
  alert("Criteria reset.");
}
