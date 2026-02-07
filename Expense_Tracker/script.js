let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let budget = localStorage.getItem("budget") || 0;

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const list = document.getElementById("list");

function setBudget() {
  budget = budgetInput.value;
  localStorage.setItem("budget", budget);
  alert("Budget saved!");
}

function addTransaction() {
  const desc = descInput.value;
  const amt = +amountInput.value;
  const cat = categoryInput.value;
  const type = typeInput.value;

  if (!desc || !amt) return alert("Fill all fields");

  transactions.push({ desc, amt, cat, type });
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
}

function updateUI(filter = "all") {
  let income = 0, expense = 0;
  list.innerHTML = "";

  transactions.forEach(t => {
    if (filter !== "all" && t.cat !== filter) return;

    if (t.type === "income") income += t.amt;
    else expense += t.amt;

    const li = document.createElement("li");
    li.innerHTML = `${t.desc} (${t.cat}) <strong>₹${t.amt}</strong>`;
    list.appendChild(li);
  });

  incomeEl.textContent = income;
  expenseEl.textContent = expense;
  balanceEl.textContent = income - expense;
}

function filterCategory(cat) {
  updateUI(cat);
}

/* 🖨 PRINT REPORT — KEY PART */
function printReport() {
  let income = 0, expense = 0;
  const printList = document.getElementById("printList");
  printList.innerHTML = "";

  transactions.forEach(t => {
    if (t.type === "income") income += t.amt;
    else expense += t.amt;

    const div = document.createElement("div");
    div.innerHTML = `${t.desc} (${t.cat})<br>₹${t.amt}`;
    printList.appendChild(div);
  });

  document.getElementById("pIncome").textContent = income;
  document.getElementById("pExpense").textContent = expense;
  document.getElementById("pBalance").textContent = income - expense;

  window.print();
}

updateUI();
