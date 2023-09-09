import { useRef, useState, useEffect } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../components/store/Auth-slice";

export default function Login() {
  const dispatch = useDispatch();
  const History = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const emailinputref = useRef();
  const passwordref = useRef();

  const storedToken = localStorage.getItem("tokenId");
  useEffect(() => {
    dispatch(authActions.login(storedToken));
  }, [dispatch, storedToken]);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailinputref.current.value;
    const enteredPassword = passwordref.current.value;

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOUY4M8esfgDGY3IdywR3hbHtX0eY-vfw";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem("enteredemail", enteredEmail);
          return res.json();
        } else {
          return res.json().then((data) => {
            let Errormessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              Errormessage = data.error.message;
            }
            throw new Error(Errormessage);
          });
        }
      })
      .then((data) => {
        dispatch(authActions.login(data.idToken));
        console.log("signIIIIN DONE");
        History("/Home");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialApp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={submitHandler}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={emailinputref}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              ref={passwordref}
            />
            <button className="loginButton" type="submit">
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="signup" className="loginRegisterButton">
              <button
                className="loginRegisterButton"
                style={{ marginLeft: "3.2rem" }}
              >
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
