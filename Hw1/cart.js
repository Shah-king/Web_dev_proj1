let cart = [];

const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    let name = button.getAttribute("data-name");
    let price = parseFloat(button.getAttribute("data-price"));

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCartDisplay();
  });
});

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = ""; // Clear previous list

  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
  const index = cart.findIndex(i => i.name === item.name);
  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
};

    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
