let records = [];

function setBg(bgClass) {
  document.body.className = bgClass;
}

function saveStudent() {
  const roll = rollInput.value.trim();
  const name = nameInput.value.trim();
  const className = classInput.value.trim();
  const subject = subjectInput.value.trim();
  const marks = parseInt(marksInput.value);
  const editIndex = parseInt(currentEdit.value);
  const btn = actionBtn;

  if (!roll || !name || !className || !subject || isNaN(marks) || marks < 0 || marks > 100) {
    alert("Please fill all fields correctly 🙂");
    return;
  }

  const grade = marks >= 90 ? "A+" :
                marks >= 80 ? "A"  :
                marks >= 70 ? "B"  :
                marks >= 60 ? "C"  :
                marks >= 50 ? "D"  : "F";

  const result = marks >= 50 ? "Pass" : "Fail";

  const student = { roll, name, className, subject, marks, grade, result };

  if (editIndex === -1) {
    records.push(student);
  } else {
    records[editIndex] = student;
    currentEdit.value = -1;
    btn.textContent = "Add Record";
  }

  clearInputs();
  renderTable();
}

function renderTable() {
  tableBody.innerHTML = "";
  records.forEach((s, i) => {
    tableBody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${s.roll}</td>
        <td>${s.name}</td>
        <td>${s.className}</td>
        <td>${s.subject}</td>
        <td>${s.marks}</td>
        <td>${s.grade}</td>
        <td class="${s.result === "Pass" ? "pass" : "fail"}">${s.result}</td>
        <td><button class="edit-btn" onclick="editRecord(${i})">Edit</button></td>
      </tr>
    `;
  });
}

function editRecord(i) {
  const s = records[i];
  rollInput.value = s.roll;
  nameInput.value = s.name;
  classInput.value = s.className;
  subjectInput.value = s.subject;
  marksInput.value = s.marks;
  currentEdit.value = i;
  actionBtn.textContent = "Update Record";
}

function clearInputs() {
  rollInput.value = "";
  nameInput.value = "";
  classInput.value = "";
  subjectInput.value = "";
  marksInput.value = "";
}

function printTable() {
  window.print();
}
