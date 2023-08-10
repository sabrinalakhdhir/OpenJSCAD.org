

initializeLogin();
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
var user = "";
var loginCount = 0;

function initializeLogin() {
    // Create the login form
    var loginlabel = document.createElement("h1");
    var errordiv = document.createElement("div");
    var errorlabel = document.createElement("p");
    var loginformsetup = document.createElement("form");
    var usernamefield = document.createElement("input");
    var passwordfield = document.createElement("input");
    var submitbutton = document.createElement("input");

    // Set the attributes for the entire login page
    loginlabel.setAttribute("id", "login-header");
    loginlabel.innerHTML = "Login";

    errordiv.setAttribute("id", "login-error-msg-holder");

    errorlabel.setAttribute("id", "login-error-msg");
    errorlabel.innerHTML = "Invalid username or password. Please try again.";

    loginformsetup.setAttribute("id", "login-form");

    usernamefield.setAttribute("id", "username-field");
    usernamefield.setAttribute("name", "username");
    usernamefield.setAttribute("placeholder", "Username");
    usernamefield.setAttribute("class", "login-form-field")

    passwordfield.setAttribute("id", "password-field");
    passwordfield.setAttribute("name", "password");
    passwordfield.setAttribute("placeholder", "Password");
    passwordfield.setAttribute("type", "password");
    passwordfield.setAttribute("class", "login-form-field")

    submitbutton.setAttribute("id", "login-form-submit");
    submitbutton.setAttribute("type", "submit");
    submitbutton.setAttribute("value", "Login");

    // Append the login form to the login div
    loginformsetup.appendChild(usernamefield);
    loginformsetup.appendChild(passwordfield);
    loginformsetup.appendChild(submitbutton);

    // Append the error label to the error div
    errordiv.appendChild(errorlabel);

    // Append all elements to the main holder in html
    document.getElementById("main-holder").appendChild(loginlabel);
    document.getElementById("main-holder").appendChild(errordiv);
    document.getElementById("main-holder").appendChild(loginformsetup);

}

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Based on the login info entered, determine which user group the user belongs to
    // Assign the user type and share that data with the next page in the tool via session storage
    if (username === "enduser" && password === "enduser1") {
        user = "enduser";
        sessionStorage.setItem("usertype", user);
        //alert("You have successfully logged in as an end-user.");
        //loginCount = locationStorage.getItem("loginCount");
        if (loginCount == 0) {
            location.replace("updatedcustomization.html");
            loginCount++;
            localStorage.setItem("loginCount", loginCount);
        }
        else {
            location.replace("designer.html");
        }
    } else if (username === "productdesigner" && password === "pd1") {
        user = "pd";
        sessionStorage.setItem("usertype", user);
        //alert("You have successfully logged in as a product designer.");
        //location.replace("designer.html");
        location.replace("demo.html");
    }
    else if (username === "healthcareprof" && password === "hcp1") {
        user = "hcp";
        sessionStorage.setItem("usertype", user);
        //alert("You have successfully logged in as a health care professional.");
        //location.replace("designer.html");
        location.replace("demo.html");
    }
    else {
        loginErrorMsg.style.opacity = 1;
    }
})
