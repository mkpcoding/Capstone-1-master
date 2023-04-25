// Check if the cart exists in localStorage, otherwise create an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, price) {
  // Check if the product already exists in the cart
  const productIndex = cart.findIndex((item) => item.name === productName);

  if (productIndex !== -1) {
    // If the product exists, increment the quantity
    cart[productIndex].quantity += 1;
  } else {
    // If the product does not exist, add it to the cart with a quantity of 1
    cart.push({
      name: productName,
      price: price,
      quantity: 1,
    });
  }

  // Update the cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  // Retrieve the cart from localStorage
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function clearCart() {
  // Clear the cart from localStorage
  localStorage.removeItem("cart");
  cart = [];
}

function displayCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  let cart = getCart();
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>No items in cart.</p>";
    return;
  }

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    const itemName = document.createElement("h5");
    itemName.textContent = item.name;
    itemName.classList.add("mb-3");

    const itemPrice = document.createElement("p");
    itemPrice.textContent = "$" + item.price;
    itemPrice.classList.add("mb-3");

    const itemQuantity = document.createElement("p");
    itemQuantity.textContent = "Quantity: " + item.quantity;
    itemQuantity.classList.add("mb-3");

    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      removeFromCart(item.id);
    };

    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemPrice);
    itemDiv.appendChild(itemQuantity);
    itemDiv.appendChild(removeButton);

    cartContainer.appendChild(itemDiv);
  });

  updateTotalCost();
}

function removeFromCart(productId) {
  // Find the index of the product in the cart
  const productIndex = cart.findIndex((item) => item.id === productId);

  // If the product is found, remove it from the cart
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
  }

  // Update the cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart display
  displayCart();
}

function updateTotalCost() {
  const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  document.getElementById("totalCost").textContent = totalCost.toFixed(2);
}

function payment() {
  // Clear the cart and display a success message
  clearCart();
  displayCart();
  alert("Thank you for your purchase!");
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.location.pathname.split("/").pop();
  if (currentPage === "checkout.html") {
    displayCart();
  }
})
;
