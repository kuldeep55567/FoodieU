function toggleForm() {
    var loginForm = document.getElementById("login-form");
    var signupForm = document.getElementById("signup-form");
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}
let baseURL = "http://127.0.0.1:5000"
let signupr = document.getElementById("signup");
signupr.addEventListener("submit", (e) => {
    e.preventDefault()
    if (document.getElementById("password").value != document.getElementById("repassword").value) {
        alert("Enter Correct Password")
    } else {
        let req = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }
        fetch(`${baseURL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req)
        })
            .then((res) => {
                if (res.ok) {
                    alert("Registered Successfully")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
})
let login = document.getElementById("login");
login.addEventListener("submit", (e) => {
    e.preventDefault();
    let req = {
        email: document.getElementById("lemail").value,
        password: document.getElementById("lpassword").value
    }
    fetch(`${baseURL}/login`, {
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
                localStorage.setItem("token", res.token)
                alert("Login Successfull")
                if (res.role == "admin") {
                    window.location.href = "admin.html"
                } else {
                    window.location.href = "dashboard.html"
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
})
const chatIcon = document.getElementById("chatIcon");
const chatContainer = document.getElementById("chatContainer");
const closeChatBtn = document.getElementById("closeChatBtn");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");
chatIcon.addEventListener("click", openChat);
closeChatBtn.addEventListener("click", () => {
    chatContainer.style.display = "none";
    chatIcon.style.display = "block";
    chatBotBtn.style.display = "block"
});
function openChat() {
    chatContainer.style.display = "block";
    chatIcon.style.display = "none";
}
function closeChat() {
    chatContainer.style.display = "none";
    chatIcon.style.display = "block";
}
function appendMessage(message, sender) {
    var messageContainer = document.createElement("div");
    messageContainer.className = "message-container";
  
    var messageElement = document.createElement("div");
    messageElement.className = "message " + sender;
    messageElement.innerHTML = message;
  
    messageContainer.appendChild(messageElement);
    chatMessages.appendChild(messageContainer);
  }
  
  
  function sendMessage() {
    const message = userInput.value.trim();
    if (message !== "") {
      userInput.value = "";
      appendMessage(message, "user");
      fetch(`${baseURL}/bot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          message: message
        })
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            console.log(data);
            var botResponse = data.response;
            appendMessage(botResponse, "bot");
            if (message === "2") {
              if (data.response && Array.isArray(data.response)) {
                var menuList = data.response;
                if (menuList.length > 0) {
                  var optionsText = menuList
                    .map(function (dish) {
                      return `Name: ${dish.dish_name}<br/>Stock: ${dish.stock}`;
                    })
                    .join("<br/><br/>");
                  appendMessage(optionsText, "bot");
                } else {
                  appendMessage("No menu items found.", "bot");
                }
              } else {
                appendMessage("No menu items found.", "bot");
              }
            }else if (message === "1") {
                if (data.response && Array.isArray(data.response)) {
                  var orderHistory = data.response;
                  if (orderHistory.length > 0) {
                    var tableHTML = '<table><thead><tr><th>Order ID</th><th>Total Price</th><th>Status</th></tr></thead><tbody>';
                    orderHistory.forEach(function (order) {
                      tableHTML += `<tr><td>${order.order_id}</td><td>${order.total_price}</td><td>${order.status}</td></tr>`;
                    });
                    tableHTML += '</tbody></table>';
                    appendMessage(tableHTML, "bot");
                  } else {
                    appendMessage("No order history found.", "bot");
                  }
                } else {
                  appendMessage("No order history found.", "bot");
                }
            }else if (message.toLowerCase() === "start") {
              if (data.options) {
                var options = data.options;
                var optionsText;
                if (options.length > 0) {
                  optionsText = options
                    .map(function (option) {
                      return option.label;
                    })
                    .join("<br/>");
                } else {
                  optionsText = "No options available.";
                }
                appendMessage(optionsText, "bot");
              }
            }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    }
  }