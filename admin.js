const ADMIN_EMAIL = "vinnieyk6765@gmail.com";
const ADMIN_PASSWORD = "vinnieyk6765";

function checkAdminLogin() {
    const loggedIn = sessionStorage.getItem("real_alpha_admin");

    const loginBox = document.getElementById("loginBox");
    const dashboard = document.getElementById("dashboard");

    if (!loginBox || !dashboard) return;

    if (loggedIn === "true") {
        loginBox.style.display = "none";
        dashboard.style.display = "block";

        if (typeof displayAdminData === "function") {
            displayAdminData();
        }
    } else {
        loginBox.style.display = "block";
        dashboard.style.display = "none";
    }
}


function loginAdmin(event) {
    event.preventDefault();

    const email =
        document.getElementById("adminEmail").value.trim();

    const password =
        document.getElementById("adminPassword").value;

    const message =
        document.getElementById("loginMessage");

    if (
        email === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
    ) {

        sessionStorage.setItem(
            "real_alpha_admin",
            "true"
        );

        message.textContent = "Login successful.";
        message.style.color = "green";

        setTimeout(function () {
            window.location.href = "admin.html";
        }, 300);

    } else {

        message.textContent =
            "Incorrect email or password.";

        message.style.color = "red";
    }
}


function logoutAdmin() {

    sessionStorage.removeItem(
        "real_alpha_admin"
    );

    window.location.href = "admin.html";
}


document.addEventListener("DOMContentLoaded", function () {

    checkAdminLogin();

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener(
            "submit",
            loginAdmin
        );
    }

    const logoutButton =
        document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener(
            "click",
            logoutAdmin
        );
    }

});
