let baseURL = "http://127.0.0.1:5000"
let add = document.getElementById("adding");
let minus = document.getElementById("deleting");
let update = document.getElementById("updating");
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
    let req = {
        dish_name: document.getElementById("name").value,
        img: document.getElementById("image").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
    }
    fetch(`${baseURL}/remove_dish/${dish_id.value}`, {
        method: "DELETE",
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
    fetch(`${baseURL}/update_dish/${order_id.value}`, {
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
// {
//     "_id": {
//       "$oid": "64a554e6a18b79fa42d015b7"
//     },
//     "user": "64a5295b71bd2403994d0a43",
//     "order_items": [
//       {
//         "dish_id": "64a544031bf87cd09a9aa89a",
//         "quantity": 4,
//         "total_price": 60
//       },
//       {
//         "dish_id": "64a544bc1bf87cd09a9aa89b",
//         "quantity": 1,
//         "total_price": 150
//       }
//     ],
//     "total_price": 210,
//     "status": "Pending"
//   }