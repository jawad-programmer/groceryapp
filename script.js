const groceryForm = document.getElementById("groceryForm");
const listContainer = document.getElementById("list");
const totalDisplay = document.getElementById("total");

let groceries = [];

function updateTotal() {
  let total = groceries.reduce((sum, item) => sum + item.qty, 0);
  totalDisplay.textContent = `Total items to buy: ${total}`;
}

function renderList() {
  listContainer.innerHTML = "";
  groceries.forEach((grocery, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
          <span>${grocery.name} <br> Qty: ${grocery.qty}</span>
          <div class="controls">
            <button onclick="decreaseQty(${index})">-</button>
            <button onclick="increaseQty(${index})">+</button>
            <button class="delete" onclick="deleteItem(${index})">🗑</button>
          </div>
        `;
    listContainer.appendChild(div);
  });
  updateTotal();
}

groceryForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(groceryForm);
  const itemName = formData.get("item").trim();

  if (itemName) {
    let existing = groceries.find(
      (g) => g.name.toLowerCase() === itemName.toLowerCase()
    );
    if (existing) {
      existing.qty += 1;
    } else {
      groceries.push({ name: itemName, qty: 1 });
    }
    groceryForm.reset();
    renderList();
  }
});

function increaseQty(index) {
  groceries[index].qty++;
  renderList();
}

function decreaseQty(index) {
  if (groceries[index].qty > 1) {
    groceries[index].qty--;
  } else {
    groceries.splice(index, 1);
  }
  renderList();
}

function deleteItem(index) {
  groceries.splice(index, 1);
  renderList();
}