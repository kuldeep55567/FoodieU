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
            name:document.getElementById("name").value,
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
            }else{
                localStorage.setItem("token", res.token)
                alert("Login Successfull")
                if(res.role=="admin"){
                    window.location.href = "admin.html"
                }else{
                    window.location.href = "product.html"
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })
})