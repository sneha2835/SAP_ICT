let order = [];

const tbody = document.getElementById("order-body");
const grandTotalEl = document.getElementById("grandTotal");

function addItem(name, price) {
  const item = order.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    order.push({ name, price, qty: 1 });
  }
  renderOrder();
}

function changeQty(index, delta) {
  order[index].qty += delta;
  if (order[index].qty <= 0) {
    order.splice(index, 1);
  }
  renderOrder();
}

function removeItem(index) {
  order.splice(index, 1);
  renderOrder();
}

function renderOrder() {
  tbody.innerHTML = "";
  let total = 0;

  order.forEach((item, i) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td>
        <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
        ${item.qty}
        <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
      </td>
      <td>₹${itemTotal}</td>
      <td><button class="remove-btn" onclick="removeItem(${i})">X</button></td>
    `;
    tbody.appendChild(row);
  });

  grandTotalEl.textContent = total;
}

function clearOrder() {
  order = [];
  renderOrder();
}

function printBill() {
  window.print();
}
