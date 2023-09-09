import { useDispatch } from "react-redux";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { validEmail, validPassword } from "../../components/Regex";
import { authActions } from "../../components/store/Auth-slice";

export default function Register() {
  const dispatch = useDispatch();
  const History = useNavigate();

  const emailref = useRef();
  const passref = useRef();
  const conpassref = useRef();

  const [error, setError] = useState("");

  const storedToken = localStorage.getItem("tokenId");
  useEffect(() => {
    dispatch(authActions.login(storedToken));
  }, [dispatch, storedToken]);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailref.current.value;
    const enteredPass = passref.current.value;
    const enteredconpass = conpassref.current.value;

    if (!validEmail.test(enteredEmail)) {
      setError("Email is not valid");
    }
    if (!validPassword.test(enteredPass)) {
      setError("Password must contain special characters");
    }
    if (enteredPass.length < 8) {
      setError("Password must contain atleast 8 characters");
    }
    if (enteredPass !== enteredconpass) {
      setError("Password and conform password is not matching");
    }

    let url;
    if (
      enteredPass === enteredconpass &&
      validPassword.test(enteredPass) &&
      enteredPass.length >= 8
    ) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOUY4M8esfgDGY3IdywR3hbHtX0eY-vfw";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredconpass,
        returnSecureToken: true,
      }),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("signup done");
          return res.json();
        } else {
          return res.json().then((data) => {
            let Errormessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              Errormessage = data.error.message;
              console.log(Errormessage);
            }
            throw new Error(Errormessage);
          });
        }
      })
      .then((data) => {
        dispatch(authActions.login(data.idtoken));
        console.log("signup done");
        alert("Account created");
        History("/");
        setError("");
      })
      .catch((error) => {
        alert(error.message);
        // console.log(error);
      });
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around .
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={submitHandler}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={emailref}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={passref}
            />
            <input
              type="password"
              placeholder="Password Again"
              className="loginInput"
              ref={conpassref}
            />
            <span style={{ color: "red", fontWeight: "bold" }}>{error}</span>

            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/" className="loginRegisterButton">
              <button
                className="loginRegisterButton"
                style={{ marginLeft: "3.2rem" }}
              >
                Log into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
