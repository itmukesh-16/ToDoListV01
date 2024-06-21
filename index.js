function loadContent() {
  var formRegister = document.getElementById("formRegister");
  formRegister.addEventListener("submit", handleRegisterFormSubmit);

  var formLogin = document.getElementById("formLogin");
  formLogin.addEventListener("submit", handleLoginFormSubmit);
}

function handleRegisterFormSubmit(event) {
  event.preventDefault();

  var newuserid = document.getElementById("newuserid");
  var password = document.getElementById("password");
  var confirmpassword = document.getElementById("confirmpassword");
  var flag = 0;

  fetch("http://localhost:3000/fetchExistingUserData")
    .then((res) => res.json())
    .then((loginTable) => {
      for (var i = 0; i < loginTable.length; i++) {
        if (
          loginTable[i].userid == newuserid.value &&
          loginTable[i].password == password.value
        ) {
          // alert(" user already exist , please login ");
          flag++;
          break;
        }
      }

      // store only if userdoesn't exist and password mathces with confirmpassword

      if (flag == 0) {

        if ( password.value == confirmpassword.value) {
          fetch("http://localhost:3000/newRegister", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid: newuserid, password: password }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Data inserted successfully:", data);
              // Optionally, refresh the product list or clear the form
              alert("registered successfully....");
              location.href = "index.html";
            })
            .catch((error) => {
              console.error("Error while inserting data:", error);
            });
        } else {
          alert("password missmatched");
        }
      } else {
        alert(" user already exist , please login ");
      }
    })
    .catch((error) => {
      console.log("erroe while fetching the data:", error);
    });
}

// applying login functionality

function handleLoginFormSubmit(event) {
  event.preventDefault();

  var loginuserid = document.getElementById("loginuserid");
  var loginpassword = document.getElementById("loginpassword");
  var flag = 0;

  fetch("http://localhost:3000/fetchExistingUserData")
    .then((res) => res.json())
    .then((loginTable) => {
      for (var i = 0; i < loginTable.length; i++) {
        if (
          loginuserid.value == loginTable[i].userid &&
          loginpassword.value == loginTable[i].password
        ) {
          console.log(" Login Successfully ");
          flag++;
          break;
        }
      }

      if (flag === 1) {
        alert("Login SuccessFul");
        location.href = "home.html";
      } else {
        alert("invalid credential , try again");
      }
    })
    .catch((error) => {
      console.log("erroe while fetching the data:", error);
    });
}
