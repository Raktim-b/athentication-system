const formSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const num = form.num.value.trim();
  const pass = form.pass.value.trim();
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const numError = document.getElementById("numError");
  const passError = document.getElementById("passError");

  nameError.textContent = "";
  emailError.textContent = "";
  numError.textContent = "";
  passError.textContent = "";

  if (name.length < 3) {
    nameError.textContent = "Name must be at least 3 characters";
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Enter a valid email";
    return;
  }

  if (num.length !== 10) {
    numError.textContent = "Phone number must be 10 digits";
    return;
  }

  if (pass.length < 6) {
    passError.textContent = "Password must be at least 6 characters";
    return;
  }

  const userDetails = {
    name: name,
    email: email,
    number: num,
    password: pass,
  };
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  //   console.log(userDetails);
  registerData(userDetails, form);
};

const registerData = async (userDetails, form) => {
  const success = document.getElementById("message");
  success.textContent = "";

  try {
    const response = await fetch(
      "https://authenticationapi-p7aa.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userDetails),
      },
    );
    const data = await response.json();
    console.log(response);
    console.log(data);

    if (response?.status === 201) {
      success.textContent = data.message;
      success.className = "message success";
      form.reset();
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    } else {
      success.textContent = data.message;
      success.className = "message error";
    }
  } catch (error) {
    console.log("error", error.message);
  }
};

const formSubmitLog = (event) => {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const pass = form.pass.value;
  const emailError = document.getElementById("emailError");
  const passError = document.getElementById("passError");

  emailError.textContent = "";
  passError.textContent = "";

  const logInDetails = {
    email: email,
    password: pass,
  };
  if (!email) {
    emailError.textContent = "Enter a valid email";
  }
  if (!pass) {
    passError.textContent = "Enter a password";
  }
  //   console.log(userDetails);
  loginData(logInDetails, form);
};

const loginData = async (logInDetails, form) => {
  const success = document.getElementById("message");
  success.textContent = "";
  try {
    const response = await fetch(
      "https://authenticationapi-p7aa.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(logInDetails),
      },
    );
    const data = await response.json();
    console.log(response);
    console.log(data);

    if (response?.status === 200) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      success.textContent = data.message;
      success.className = "message success";
      form.reset();
      setTimeout(() => {
        // window.location.href = "dashboard.html";
      }, 1000);
    } else {
      success.textContent = data.message;
      success.className = "message error";
    }
  } catch (error) {
    console.log("error", error.message);
  }
};

const currentPage = window.location.pathname;

if (currentPage.includes("dashboard.html")) {
  const token = localStorage.getItem("token");
  // const user = localStorage.getItem("user");

  // if (!token || !user) {
  if (!token) {
    window.location.href = "login.html";
  }
}

const logout = () => {
  localStorage.removeItem("token");
  // localStorage.removeItem("user");
  window.location.href = "login.html";
};
