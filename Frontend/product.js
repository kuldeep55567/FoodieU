let baseURL = "http://127.0.0.1:5000";
const menu = document.getElementById("menu");
const cartItemsContainer = document.getElementById("cart-items");
const placeOrderButton = document.getElementById("place-order-btn");
const cartTotalPriceElement = document.getElementById("cart-total-price");

let cart = [];

fetch(`${baseURL}/menu`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
    .then((res) => res.json())
    .then((data) => {
        data.menu.forEach((dish) => {
            const dishElement = document.createElement("div");
            dishElement.classList.add("dish-item");
            dishElement.innerHTML = `
                        <img src="${dish.img}" alt="${dish.dish_name}">
                        <h3>${dish.dish_name}</h3>
                        <details>${dish.description}</details>
                        <p>Price: $${dish.price}</p>
                        <p>Stock: ${dish.stock}</p>
                        <div>
                            <button class="add-to-cart-btn" data-dish-id="${dish.dish_id}" data-dish-price="${dish.price}">Add to Cart</button>
                            <div class="quantity">
                                <button class="decrement-btn">-</button>
                                <span class="quantity-value">1</span>
                                <button class="increment-btn">+</button>
                            </div>
                        </div>
                    `;
            menu.appendChild(dishElement);
        });

        const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

        addToCartButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const dishId = button.dataset.dishId;
                const dishPrice = parseFloat(button.dataset.dishPrice);
                const quantityValue = button.parentElement.querySelector(".quantity-value");
                const quantity = parseInt(quantityValue.textContent);

                if (isDishInCart(dishId)) {
                    alert("This dish is already in the cart.");
                    return;
                }

                const cartItem = {
                    dishId,
                    quantity,
                    totalPrice: dishPrice * quantity,
                };

                cart.push(cartItem);
                updateCart();
                updateButtonStatus(button);
                alert("Item added to cart!");
            });
        });

        placeOrderButton.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Cart is empty. Add items to cart before placing an order.");
                return;
            }

            const orderData = {
                order_dishes: cartItems.map((item) => ({
                    dish_id: item.dish_id,
                    quantity: item.quantity,
                })),
            };

            fetch(`${baseURL}/order`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message) {
                        alert(data.message);
                        // Clear the cart after placing the order
                        localStorage.removeItem("cartItems");
                        updateCartCount(0);
                        renderCartItems([]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        function isDishInCart(dishId) {
            return cart.some((item) => item.dishId === dishId);
        }

        function updateCart() {
            cartItemsContainer.innerHTML = "";
            let totalPrice = 0;

            cart.forEach((item) => {
                const cartItemElement = document.createElement("div");
                cartItemElement.classList.add("cart-item");
                cartItemElement.innerHTML = `
                            <p>Dish ID: ${item.dishId}</p>
                            <p>Quantity: ${item.quantity}</p>
                            <p>Price: $${item.totalPrice}</p>
                            <button class="order-btn" data-dish-id="${item.dishId}">Order</button>
                        `;
                cartItemsContainer.appendChild(cartItemElement);

                totalPrice += item.totalPrice;
            });

            cartTotalPriceElement.textContent = `Total Price: $${totalPrice}`;

            const orderButtons = document.querySelectorAll(".order-btn");

            orderButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const dishId = button.dataset.dishId;
                    // Send a POST request to the order route with the dish ID
                    const orderData = {
                        order_dishes: [
                            {
                                dish_id: dishId,
                                quantity: 1,
                            }
                        ]
                    };

                    fetch(`${baseURL}/order`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(orderData)
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.error) {
                                console.log(data.error);
                            } else {
                                alert("Order placed successfully");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            });
        }

        function resetQuantityInput(quantityValue) {
            quantityValue.textContent = "1";
        }

        function updateButtonStatus(button) {
            button.textContent = "Already in Cart";
            button.disabled = true;
        }

        function clearCart() {
            cart = [];
            cartItemsContainer.innerHTML = "";
            cartTotalPriceElement.textContent = "";
            const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
            addToCartButtons.forEach((button) => {
                button.textContent = "Add to Cart";
                button.disabled = false;
            });
        }

        const incrementButtons = document.querySelectorAll(".increment-btn");
        const decrementButtons = document.querySelectorAll(".decrement-btn");

        incrementButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const quantityValue = button.parentElement.querySelector(".quantity-value");
                let quantity = parseInt(quantityValue.textContent);
                quantity++;
                quantityValue.textContent = quantity.toString();
            });
        });

        decrementButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const quantityValue = button.parentElement.querySelector(".quantity-value");
                let quantity = parseInt(quantityValue.textContent);
                if (quantity > 1) {
                    quantity--;
                    quantityValue.textContent = quantity.toString();
                }
            });
        });
    })
    .catch((error) => {
        console.log(error);
    });