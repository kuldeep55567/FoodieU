let baseURL = "http://127.0.0.1:5000"
let add = document.getElementById("adding");
let minus = document.getElementById("deleting");
let update = document.getElementById("updating");
let dish_update = document.getElementById("updateDish");
add.addEventListener("submit", (e) => {
    e.preventDefault();
    let req = {
        dish_name: document.getElementById("name").value,
        img: document.getElementById("image").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
    }
    fetch(`${baseURL}/add_dish`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req)
    })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            console.log(res)
            if (res.error) {
                alert("Wrong Credentials")
            } else {
                alert("Dish added Successfully")
            }
        })
        .catch((err) => {
            console.log(err);
        })
})
let dish_id = document.getElementById("dish_id")
minus.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`${baseURL}/remove_dish/${dish_id.value}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            console.log(res)
            if (res.error) {
                alert("Wrong Credentials")
            } else {
                alert("Dish Deleted Successfully")
            }
        })
        .catch((err) => {
            console.log(err);
        })
})
let order_id = document.getElementById("order_id")
update.addEventListener("submit", (e) => {
    e.preventDefault();
    let req = {
        status: document.getElementById("new_status").value,
    }
    fetch(`${baseURL}//update_order/${order_id.value}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(req)
    })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            console.log(res)
            if (res.error) {
                alert("Wrong Credentials")
            } else {
                alert("Status Updated Successfully")
            }
        })
        .catch((err) => {
            console.log(err);
        })
})
let update_id = document.getElementById("uid")
dish_update.addEventListener("submit", (e) => {
    e.preventDefault();
    let req = {
        dish_name: document.getElementById("uname").value,
        img: document.getElementById("uimage").value,
        description: document.getElementById("udescription").value,
        price: document.getElementById("uprice").value,
        stock: document.getElementById("ustock").value,
    }
    fetch(`${baseURL}/update_dish/${update_id.value}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(req)
    })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            console.log(res)
            if (res.error) {
                alert("Wrong Credentials")
            } else {
                alert("Dish Updated Successfully")
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

const orderListContainer = document.getElementById("order-list");

fetch(`${baseURL}/all_orders`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
})
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      console.log(data.error);
      return;
    }
    const orders = data.orders;
    if (orders.length === 0) {
      orderListContainer.textContent = "No orders available.";
      return;
    }
    // Create an unordered list to display the orders
    const list = document.createElement("ul");
    list.classList.add("order-list");
    // Iterate over each order
    orders.forEach((order) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <div class="order-info">
          <span class="order-id">Order ID: ${order.order_id}</span>
          <br/>
          <span class="user-id">User ID: ${order.user_id}</span>
                <br/>       
          <span class="total-price">Total Price: $${order.total_price}</span>
                <br/>       
          <span class="status">Status: ${order.status}</span>
               <br/>        
        </div>
        <div class="dishes">Dishes ID:</div>
      `;
      order.dishes.forEach((dish) => {
        const dishItem = document.createElement("div");
        dishItem.textContent = dish;
        listItem.querySelector(".dishes").appendChild(dishItem);
      });

      list.appendChild(listItem);
    });

    // Append the list to the order list container
    orderListContainer.appendChild(list);
  })
  .catch((error) => {
    console.log(error);
  });